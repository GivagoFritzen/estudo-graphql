import { AcaoCompleta } from "./dtos/models/acao-completa-model";
import { Acao } from "./dtos/models/acao-model";

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










export const getInfoAcao = async (papel: String): Promise<AcaoCompleta[]> => {
    try {
        const { data } = await axios.get(url + papel);
        const $ = cheerio.load(data);

        // Extrair os dados desejados usando seletores do cheerio
        const tables = $('table');

        tables.eq(2).find('tr').each((rowIndex: number, row: any) => {
            const cells = $(row).find('td');
            cells.each((cellIndex: number, cell: any) => {
                if ($(cell).text().trim() !== "")
                    console.log($(cell).text().trim());
            });
            //console.log($(row).find('td').eq(0).text());
        });








        // Array para armazenar os dados da tabela
        const tableData: AcaoCompleta[] = [];

        return tableData;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};