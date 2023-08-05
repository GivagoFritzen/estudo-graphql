import { parse } from 'date-fns';
import { AcaoCompleta } from "../dtos/models/acao-completa-model";
import { DadosDemonstrativosDeResultados } from "../dtos/models/dados-demonstrativos-de-resultados-model";
import { Oscilacoes } from '../dtos/models/oscilacoes-model';
import { DadosBalancoPatrimonial } from '../dtos/models/dados-balanco-patrimonial-model';
import { IndicadoresFundamentalistas } from '../dtos/models/indicadores-fundamentalistas-model';

export class AcaoCompletaMapper {

    static DetalhesPapelToAcaoCompleta(webScraper: DetalhesPapel[]): AcaoCompleta[] {
        const acoesCompletas: AcaoCompleta[] = [];

        webScraper.forEach(element => {
            const novaAcao = new AcaoCompleta();

            novaAcao.papel = element['Papel'];
            novaAcao.tipo = element['Tipo'];
            novaAcao.setor = element['Setor'];
            novaAcao.subsetor = element['Subsetor'];
            novaAcao.cotacao = parseFloat(element['Cotação']);
            novaAcao.minUltimasCinquentaDuasSemanas = parseFloat(element['Min 52 sem']);
            novaAcao.maxUltimasCinquentaDuasSemanas = parseFloat(element['Max 52 sem']);
            novaAcao.volumeMedioNegociadoUltimosDoisMeses = parseFloat(element['Vol $ méd (2m)']);
            novaAcao.valorMercado = parseFloat(element['Valor de mercado']);
            novaAcao.valorFirma = parseFloat(element['Valor da firma']);
            novaAcao.numeroAcoes = parseFloat(element['Nro. Ações']);
            let data = parse(element['Últ balanço processado'], 'dd/MM/yyyy', new Date());
            novaAcao.ultimoBalancoProcessado = data.toLocaleDateString('en-GB');

            const oscilacoes = new Oscilacoes();
            oscilacoes.diaPorcentagem = parseFloat(element['Dia']);
            oscilacoes.mesPorcentagem = parseFloat(element['Mês']);
            oscilacoes.trintaDiasPorcentagem = parseFloat(element['30 dias']);
            oscilacoes.dozeMesesPorcentagem = parseFloat(element['12 meses']);

            const dataAtual = new Date().getFullYear();
            oscilacoes.anoAnteriorPorcentagem = parseFloat(element[dataAtual - 1]);
            oscilacoes.doisAnosAntesPorcentagem = parseFloat(element[dataAtual - 2]);
            oscilacoes.tresAnosAntesPorcentagem = parseFloat(element[dataAtual - 3]);
            oscilacoes.quatroAnosAntesPorcentagem = parseFloat(element[dataAtual - 4]);
            novaAcao.oscilacoes = oscilacoes;

            let indicadoresFundamentalistas = new IndicadoresFundamentalistas();
            indicadoresFundamentalistas.p_l = parseFloat(element['P/L']);
            indicadoresFundamentalistas.p_vp = parseFloat(element['P/VP']);
            indicadoresFundamentalistas.p_ebit = parseFloat(element['P/EBIT']);
            indicadoresFundamentalistas.psr = parseFloat(element['PSR']);
            indicadoresFundamentalistas.p_ativos = parseFloat(element['P/Ativos']);
            indicadoresFundamentalistas.p_capGiro = parseFloat(element['P/Cap. Giro']);
            indicadoresFundamentalistas.p_ativoCirculantesLiquitos = parseFloat(element['P/Ativ Circ Liq']);
            indicadoresFundamentalistas.dividendYieldPorcentagem = parseFloat(element['Div. Yield']);
            indicadoresFundamentalistas.ev_ebitda = parseFloat(element['EV / EBITDA']);
            indicadoresFundamentalistas.ev_ebit = parseFloat(element['EV / EBIT']);
            indicadoresFundamentalistas.crescimentoReceitaCincoAnosPorcentagem = parseFloat(element['Cres. Rec (5a)']);

            indicadoresFundamentalistas.lpa = parseFloat(element['LPA']);
            indicadoresFundamentalistas.vpa = parseFloat(element['VPA']);
            indicadoresFundamentalistas.margemBrutaPorcentagem = parseFloat(element['Marg. Bruta']);
            indicadoresFundamentalistas.margemEbitPorcentagem = parseFloat(element['Marg. EBIT']);
            indicadoresFundamentalistas.margemLiquidaPorcentagem = parseFloat(element['Marg. Líquida']);
            indicadoresFundamentalistas.ebit_AtivoPorcentagem = parseFloat(element['EBIT / Ativo']);
            indicadoresFundamentalistas.roicPorcentagem = parseFloat(element['ROIC']);
            indicadoresFundamentalistas.roePorcentagem = parseFloat(element['ROE']);
            indicadoresFundamentalistas.liquidezCorr = parseFloat(element['Liquidez Corr']);
            indicadoresFundamentalistas.divBrutaTotalDivididoPatrimonioLiquido = parseFloat(element['Div Br/ Patrim']);
            indicadoresFundamentalistas.giroAtivos = parseFloat(element['Giro Ativos']);
            novaAcao.indicadoresFundamentalistas = indicadoresFundamentalistas;

            const dadosBalancoPatrimonial = new DadosBalancoPatrimonial();
            dadosBalancoPatrimonial.ativo = parseFloat(element['Ativo']);
            dadosBalancoPatrimonial.disponibilidades = parseFloat(element['Disponibilidades']);
            dadosBalancoPatrimonial.ativoCirculante = parseFloat(element['Ativo Circulante']);
            dadosBalancoPatrimonial.dividaBruta = parseFloat(element['Dív. Bruta']);
            dadosBalancoPatrimonial.dividaLiquida = parseFloat(element['Dív. Líquida']);
            dadosBalancoPatrimonial.patrimonioLiquido = parseFloat(element['Patrim. Líq']);
            novaAcao.dadosBalancoPatrimonial = dadosBalancoPatrimonial;

            const dadosDemonstrativosDeResultadosUltimosTresMeses = new DadosDemonstrativosDeResultados();
            dadosDemonstrativosDeResultadosUltimosTresMeses.receitaLiquida = parseInt(element['Receita Líquida Ultimos Tres Meses'].replace(/\./g, ""));
            dadosDemonstrativosDeResultadosUltimosTresMeses.ebit = parseInt(element['EBIT Ultimos Tres Meses'].replace(/\./g, ""));
            dadosDemonstrativosDeResultadosUltimosTresMeses.lucroLiquido = parseInt(element['Lucro Líquido Ultimos Tres Meses'].replace(/\./g, ""));
            novaAcao.dadosDemonstrativosDeResultadosUltimosTresMeses = dadosDemonstrativosDeResultadosUltimosTresMeses;

            const dadosDemonstrativosDeResultadosUltimosDozeMeses = new DadosDemonstrativosDeResultados();
            dadosDemonstrativosDeResultadosUltimosDozeMeses.receitaLiquida = parseInt(element['Receita Líquida Ultimos Dozes Meses'].replace(/\./g, ""));
            dadosDemonstrativosDeResultadosUltimosDozeMeses.ebit = parseInt(element['EBIT Ultimos Dozes Meses'].replace(/\./g, ""));
            dadosDemonstrativosDeResultadosUltimosDozeMeses.lucroLiquido = parseInt(element['Lucro Líquido Ultimos Dozes Meses'].replace(/\./g, ""));
            novaAcao.dadosDemonstrativosDeResultadosUltimosDozeMeses = dadosDemonstrativosDeResultadosUltimosDozeMeses;

            acoesCompletas.push(novaAcao);
        });

        return acoesCompletas;
    }
}

