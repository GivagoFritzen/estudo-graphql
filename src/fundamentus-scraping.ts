import { AcaoCompleta } from "./dtos/models/acao-completa-model";
import { Acao } from "./dtos/models/acao-model";
import { AcaoCompletaMapper } from "./mapper/acao-completa-mapper";

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.fundamentus.com.br/detalhes.php?papel=';

export const getAcoesEmpresasBolsaB3 = async (): Promise<Acao[]> => {
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

export const getInfoAcao = async (papeis: []): Promise<AcaoCompleta[]> => {
    try {
        const webScraper: DetalhesPapel[] = [];

        const promises = papeis.map(async papel => {
            var resArBuffer = await axios.get(
                url + papel,
                {
                    responseType: 'arraybuffer',
                }
            );
            var response = resArBuffer.data.toString("latin1");
            const $ = cheerio.load(Buffer.from(response, 'utf-8').toString());
            const tables = $('table');

            let geral = getDetalheDoPapel(tables.eq(0), $, -1);
            geral = { ...geral, ...getDetalheDoPapel(tables.eq(1), $, -1) };
            const oscilacoesIndicadoresFundamentalistas = getDetalheDoPapel(tables.eq(2), $, 0);
            const dadosBalancoPatrimonial = getDetalheDoPapel(tables.eq(3), $, 0);
            const dadosDemonstrativosDeResultados = getDetalheDoPapelDadosDemonstrativosDeResultados(tables.eq(4), $, 1);

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


const getDetalheDoPapel = (table: any, $: any, trIndex: number = -1): DetalhesPapel => {
    let dicionario: DetalhesPapel = {};
    let chave: any;

    table.find(`tr:gt(${trIndex})`).each((rowIndex: number, row: any) => {
        const cells = $(row).find('td');
        cells.each((cellIndex: number, cell: any) => {
            const celula = $(cell).text().trim();
            if (celula !== "") {
                if (cellIndex % 2 === 0) {
                    chave = celula.replace(/\?/g, '');
                }
                else {
                    if (dicionario[chave]) {
                        dicionario[chave + rowIndex] = celula;
                    } else {
                        dicionario[chave] = celula;
                    }
                }
            }
        });
    });
    return dicionario;
}


const getDetalheDoPapelDadosDemonstrativosDeResultados = (table: any, $: any, trIndex: number = -1): DetalhesPapel => {
    const detalhes = getDetalheDoPapel(table, $, trIndex);
    let dicionario: DetalhesPapel = {};

    dicionario['Receita Líquida Ultimos Dozes Meses'] = detalhes['Receita Líquida'];
    dicionario['Receita Líquida Ultimos Tres Meses'] = detalhes['Receita Líquida0'];

    dicionario['EBIT Ultimos Dozes Meses'] = detalhes['EBIT'];
    dicionario['EBIT Ultimos Tres Meses'] = detalhes['EBIT1'];

    dicionario['Lucro Líquido Ultimos Dozes Meses'] = detalhes['Lucro Líquido'];
    dicionario['Lucro Líquido Ultimos Tres Meses'] = detalhes['Lucro Líquido2'];

    return dicionario;
}
