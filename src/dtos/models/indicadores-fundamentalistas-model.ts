import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class IndicadoresFundamentalistas {
    @Field()
    p_l: number;
    @Field()
    p_vp: number;
    @Field()
    p_ebit: number;
    @Field()
    psr: number;
    @Field()
    p_ativos: number;
    @Field()
    p_capGiro: number;
    @Field()
    p_ativoCirculantesLiquitos: number;
    @Field()
    dividendYieldPorcentagem: number;
    @Field()
    ev_ebitda: number;
    @Field()
    ev_ebit: number;
    @Field()
    crescimentoReceitaCincoAnosPorcentagem: number;

    @Field()
    lpa: number;
    @Field()
    vpa: number;
    @Field()
    margemBrutaPorcentagem: number;
    @Field()
    margemEbitPorcentagem: number;
    @Field()
    margemLiquidaPorcentagem: number;
    @Field()
    ebit_AtivoPorcentagem: number;
    @Field()
    roicPorcentagem: number;
    @Field()
    roePorcentagem: number;
    @Field()
    liquidezCorr: number;
    @Field()
    divBrutaTotalDivididoPatrimonioLiquido: number;
    @Field()
    giroAtivos: number;
}
