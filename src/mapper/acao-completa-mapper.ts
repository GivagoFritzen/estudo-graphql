import { parse } from 'date-fns';
import { AcaoCompleta, DadosBalancoPatrimonial, DadosDemonstrativosDeResultados, IndicadoresFundamentalistas, Oscilacoes } from '../dtos/models';


export class AcaoCompletaMapper {
    static DetalhesPapelToAcaoCompleta(webScraper: DetalhesPapel[]): AcaoCompleta[] {
        const acoesCompletas: AcaoCompleta[] = [];

        webScraper.forEach(element => {
            const novaAcao = new AcaoCompleta();

            novaAcao.papel = element['Papel'];
            novaAcao.tipo = element['Tipo'];
            novaAcao.setor = element['Setor'];
            novaAcao.subsetor = element['Subsetor'];
            novaAcao.cotacao = this.converterToFloat(element['Cotação']);
            novaAcao.minUltimasCinquentaDuasSemanas = this.converterToFloat(element['Min 52 sem']);
            novaAcao.maxUltimasCinquentaDuasSemanas = this.converterToFloat(element['Max 52 sem']);
            novaAcao.volumeMedioNegociadoUltimosDoisMeses = this.converterToFloat(element['Vol $ méd (2m)']);
            novaAcao.valorMercado = this.converterToFloat(element['Valor de mercado']);
            novaAcao.valorFirma = this.converterToFloat(element['Valor da firma']);
            novaAcao.numeroAcoes = this.converterToFloat(element['Nro. Ações']);
            let data = parse(element['Últ balanço processado'], 'dd/MM/yyyy', new Date());
            novaAcao.ultimoBalancoProcessado = data.toLocaleDateString('en-GB');

            const oscilacoes = new Oscilacoes();
            oscilacoes.diaPorcentagem = this.converterToFloat(element['Dia']);
            oscilacoes.mesPorcentagem = this.converterToFloat(element['Mês']);
            oscilacoes.trintaDiasPorcentagem = this.converterToFloat(element['30 dias']);
            oscilacoes.dozeMesesPorcentagem = this.converterToFloat(element['12 meses']);

            const dataAtual = new Date().getFullYear();
            oscilacoes.anoAnteriorPorcentagem = this.converterToDataAndGetYear(element, -1);
            oscilacoes.doisAnosAntesPorcentagem = this.converterToDataAndGetYear(element, -2);
            oscilacoes.tresAnosAntesPorcentagem = this.converterToDataAndGetYear(element, -3);
            oscilacoes.quatroAnosAntesPorcentagem = this.converterToDataAndGetYear(element, -4);
            novaAcao.oscilacoes = oscilacoes;

            let indicadoresFundamentalistas = new IndicadoresFundamentalistas();
            indicadoresFundamentalistas.p_l = this.converterToFloat(element['P/L']);
            indicadoresFundamentalistas.p_vp = this.converterToFloat(element['P/VP']);
            indicadoresFundamentalistas.p_ebit = this.converterToFloat(element['P/EBIT']);
            indicadoresFundamentalistas.psr = this.converterToFloat(element['PSR']);
            indicadoresFundamentalistas.p_ativos = this.converterToFloat(element['P/Ativos']);
            indicadoresFundamentalistas.p_capGiro = this.converterToFloat(element['P/Cap. Giro']);
            indicadoresFundamentalistas.p_ativoCirculantesLiquitos = this.converterToFloat(element['P/Ativ Circ Liq']);
            indicadoresFundamentalistas.dividendYieldPorcentagem = this.converterToFloat(element['Div. Yield']);
            indicadoresFundamentalistas.ev_ebitda = this.converterToFloat(element['EV / EBITDA']);
            indicadoresFundamentalistas.ev_ebit = this.converterToFloat(element['EV / EBIT']);
            indicadoresFundamentalistas.crescimentoReceitaCincoAnosPorcentagem = this.converterToFloat(element['Cres. Rec (5a)']);

            indicadoresFundamentalistas.lpa = this.converterToFloat(element['LPA']);
            indicadoresFundamentalistas.vpa = this.converterToFloat(element['VPA']);
            indicadoresFundamentalistas.margemBrutaPorcentagem = this.converterToFloat(element['Marg. Bruta']);
            indicadoresFundamentalistas.margemEbitPorcentagem = this.converterToFloat(element['Marg. EBIT']);
            indicadoresFundamentalistas.margemLiquidaPorcentagem = this.converterToFloat(element['Marg. Líquida']);
            indicadoresFundamentalistas.ebit_AtivoPorcentagem = this.converterToFloat(element['EBIT / Ativo']);
            indicadoresFundamentalistas.roicPorcentagem = this.converterToFloat(element['ROIC']);
            indicadoresFundamentalistas.roePorcentagem = this.converterToFloat(element['ROE']);
            indicadoresFundamentalistas.liquidezCorr = this.converterToFloat(element['Liquidez Corr']);
            indicadoresFundamentalistas.divBrutaTotalDivididoPatrimonioLiquido = this.converterToFloat(element['Div Br/ Patrim']);
            indicadoresFundamentalistas.giroAtivos = this.converterToFloat(element['Giro Ativos']);
            novaAcao.indicadoresFundamentalistas = indicadoresFundamentalistas;

            const dadosBalancoPatrimonial = new DadosBalancoPatrimonial();
            dadosBalancoPatrimonial.ativo = this.converterToFloat(element['Ativo']);
            dadosBalancoPatrimonial.disponibilidades = this.converterToFloat(element['Disponibilidades']);
            dadosBalancoPatrimonial.ativoCirculante = this.converterToFloat(element['Ativo Circulante']);
            dadosBalancoPatrimonial.dividaBruta = this.converterToFloat(element['Dív. Bruta']);
            dadosBalancoPatrimonial.dividaLiquida = this.converterToFloat(element['Dív. Líquida']);
            dadosBalancoPatrimonial.patrimonioLiquido = this.converterToFloat(element['Patrim. Líq']);
            novaAcao.dadosBalancoPatrimonial = dadosBalancoPatrimonial;

            const dadosDemonstrativosDeResultadosUltimosTresMeses = new DadosDemonstrativosDeResultados();
            dadosDemonstrativosDeResultadosUltimosTresMeses.receitaLiquida = this.converterToInt(element['Receita Líquida Ultimos Tres Meses']);
            dadosDemonstrativosDeResultadosUltimosTresMeses.ebit = this.converterToInt(element['EBIT Ultimos Tres Meses']);
            dadosDemonstrativosDeResultadosUltimosTresMeses.lucroLiquido = this.converterToInt(element['Lucro Líquido Ultimos Tres Meses']);
            novaAcao.dadosDemonstrativosDeResultadosUltimosTresMeses = dadosDemonstrativosDeResultadosUltimosTresMeses;

            const dadosDemonstrativosDeResultadosUltimosDozeMeses = new DadosDemonstrativosDeResultados();
            dadosDemonstrativosDeResultadosUltimosDozeMeses.receitaLiquida = this.converterToInt(element['Receita Líquida Ultimos Dozes Meses']);
            dadosDemonstrativosDeResultadosUltimosDozeMeses.ebit = this.converterToInt(element['EBIT Ultimos Dozes Meses']);
            dadosDemonstrativosDeResultadosUltimosDozeMeses.lucroLiquido = this.converterToInt(element['Lucro Líquido Ultimos Dozes Meses']);
            novaAcao.dadosDemonstrativosDeResultadosUltimosDozeMeses = dadosDemonstrativosDeResultadosUltimosDozeMeses;

            acoesCompletas.push(novaAcao);
        });

        return acoesCompletas;
    }

    private static converterToInt(texto: String | number): number {
        if (typeof texto === 'number')
            return texto;

        return parseInt(
            texto.replace(',', '.')
                .replace('%', '')
                .replace(/\./g, "")
        );
    }


    private static converterToFloat(texto: String | number): number {
        if (typeof texto === 'number') {
            return texto;
        }

        return parseFloat(
            texto.replace(',', '.').replace('%', '')
        );
    }

    private static converterToDataAndGetYear(element: DetalhesPapel, backXYears = 0): number {
        const dataAtual = new Date().getFullYear();
        const currentYear = (dataAtual - backXYears).toString();

        if (!element.hasOwnProperty(currentYear))
            return 0;

        return this.converterToFloat(element[currentYear]);
    }
}

