import { Field, ObjectType } from "type-graphql";
import { IndicadoresFundamentalistasSimplificado } from "./indicadores-fundamentalistas-simplificado-model";

@ObjectType()
export class IndicadoresFundamentalistas extends IndicadoresFundamentalistasSimplificado {
    @Field()
    p_ebit: number;
    @Field()
    psr: number;
    @Field()
    p_ativos: number;
    @Field()
    p_capGiro?: number;
    @Field()
    p_ativoCirculantesLiquitos?: number;
    @Field()
    ev_ebitda: number;
    @Field()
    ev_ebit: number;

    @Field()
    margemBrutaPorcentagem: number;
    @Field()
    margemEbitPorcentagem: number;
    @Field()
    roicPorcentagem?: number;
    @Field()
    liquidezCorr?: number;
    @Field()
    divBrutaTotalDivididoPatrimonioLiquido?: number;
    @Field()
    giroAtivos: number;
}
