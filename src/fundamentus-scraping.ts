import { Acao, AcaoCompleta, AcaoSetorBancario } from "./dtos/models";
import { PapelBanco, PapelNaoBanco, PapelNaoEncontrado } from "./exception";
import { AcaoCompletaMapper } from "./mapper/acao-completa-mapper";

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.fundamentus.com.br/detalhes.php?papel=';

export class WebScraper {
    static getAcoesEmpresasBolsaB3 = async (): Promise<Acao[]> => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            // Extrair os dados desejados usando seletores do cheerio
            const table = $('table');

            // Array para armazenar os dados da tabela
            const tableData: Acao[] = [];

            // Percorrer cada linha da tabela (exceto a primeira, que contém os cabeçalhos)
            table.find('tr:gt(0)').each((_: any, row: any) => {
                let novaAcao = new Acao();
                novaAcao.papel = $(row).find('td').eq(0).text();
                novaAcao.nomeComercial = $(row).find('td').eq(1).text();
                novaAcao.razaoSocial = $(row).find('td').eq(2).text();

                tableData.push(novaAcao);
            });

            return tableData;
        } catch (error) {
            console.log('Error:', error);
            throw error;
        }
    };

    static getInfoAcao = async (papeis: String[]): Promise<AcaoCompleta[]> => {
        try {
            const webScraper: DetalhesPapel[] = [];

            const promises = papeis.map(async papel => {
                const $ = await this.getFundamentusPage(papel);

                if (!this.papelExist($)) {
                    throw new PapelNaoEncontrado(papel);
                }
                if (!this.papelIsBanco($)) {
                    throw new PapelBanco(papel);
                }

                const tables = $('table');

                let geral = this.getDetalheDoPapel(tables.eq(0), $, -1);
                geral = { ...geral, ...this.getDetalheDoPapel(tables.eq(1), $, -1) };
                const oscilacoesIndicadoresFundamentalistas = this.getDetalheDoPapel(tables.eq(2), $, 0);
                const dadosBalancoPatrimonial = this.getDetalheDoPapel(tables.eq(3), $, 0);
                const dadosDemonstrativosDeResultados = this.getDetalheDoPapelDadosDemonstrativosDeResultados(tables.eq(4), $, 1);

                return {
                    ...geral,
                    ...oscilacoesIndicadoresFundamentalistas,
                    ...dadosBalancoPatrimonial,
                    ...dadosDemonstrativosDeResultados
                };
            });

            const result = await Promise.all(promises);
            webScraper.push(...result);

            return AcaoCompletaMapper.DetalhesPapelToAcaoCompleta(webScraper);
        } catch (error) {
            console.log('Error:', error);
            throw error;
        }
    };







    // Fazer
    static getInfoAcaoBancarias = async (papeis: String[]): Promise<AcaoSetorBancario[]> => {
        try {
            const webScraper: DetalhesPapel[] = [];

            const promises = papeis.map(async papel => {
                const $ = await this.getFundamentusPage(papel);

                if (!this.papelExist($)) {
                    throw new PapelNaoEncontrado(papel);
                }
                if (this.papelIsBanco($)) {
                    throw new PapelNaoBanco(papel);
                }

                const tables = $('table');

                let geral = this.getDetalheDoPapel(tables.eq(0), $, -1);
                geral = { ...geral, ...this.getDetalheDoPapel(tables.eq(1), $, -1) };
                const oscilacoesIndicadoresFundamentalistas = this.getDetalheDoPapel(tables.eq(2), $, 0);
                const dadosBalancoPatrimonial = this.getDetalheDoPapel(tables.eq(3), $, 0);
                const dadosDemonstrativosDeResultados = this.getDetalheDoPapelDadosDemonstrativosDeResultados(tables.eq(4), $, 1);

                return {
                    ...geral,
                    ...oscilacoesIndicadoresFundamentalistas,
                    ...dadosBalancoPatrimonial,
                    ...dadosDemonstrativosDeResultados
                };
            });

            const result = await Promise.all(promises);
            webScraper.push(...result);

            return [new AcaoSetorBancario()];
            //return AcaoCompletaMapper.DetalhesPapelToAcaoCompleta(webScraper);
        } catch (error) {
            console.log('Error:', error);
            throw error;
        }
    };











    private static async getFundamentusPage(papel: String): Promise<any> {
        var resArBuffer = await axios.get(
            url + papel,
            {
                responseType: 'arraybuffer',
            }
        );
        var response = resArBuffer.data.toString("latin1");
        return cheerio.load(Buffer.from(response, 'utf-8').toString());
    }

    private static getDetalheDoPapel = (table: any, $: any, trIndex: number = -1): DetalhesPapel => {
        let dicionario: DetalhesPapel = {};
        let chave: any;

        table.find(`tr:gt(${trIndex})`).each((rowIndex: number, row: any) => {
            const cells = $(row).find('td');
            cells.each((cellIndex: number, cell: any) => {
                let celula = $(cell).text().trim();
                if (celula !== "") {
                    if (cellIndex % 2 === 0) {
                        chave = celula.replace(/\?/g, '');
                    }
                    else {
                        if (dicionario[chave]) {
                            dicionario[chave + rowIndex] = celula;
                        } else {
                            if (celula == '-') {
                                celula = 0;
                            }

                            dicionario[chave] = celula;
                        }
                    }
                }
            });
        });
        return dicionario;
    }

    private static getDetalheDoPapelDadosDemonstrativosDeResultados = (table: any, $: any, trIndex: number = -1): DetalhesPapel => {
        const detalhes = this.getDetalheDoPapel(table, $, trIndex);
        let dicionario: DetalhesPapel = {};

        dicionario['Receita Líquida Ultimos Dozes Meses'] = detalhes['Receita Líquida'];
        dicionario['Receita Líquida Ultimos Tres Meses'] = detalhes['Receita Líquida0'];

        dicionario['EBIT Ultimos Dozes Meses'] = detalhes['EBIT'];
        dicionario['EBIT Ultimos Tres Meses'] = detalhes['EBIT1'];

        dicionario['Lucro Líquido Ultimos Dozes Meses'] = detalhes['Lucro Líquido'];
        dicionario['Lucro Líquido Ultimos Tres Meses'] = detalhes['Lucro Líquido2'];

        return dicionario;
    }

    // Validator
    private static papelExist = ($: any): boolean => {
        const pageText = $('body').text();
        return !pageText.includes("Nenhum papel encontrado");
    }

    private static papelIsBanco = ($: any): boolean => {
        const pageText = $('body').text();
        return !pageText.includes("Result Int Financ");
    }
}