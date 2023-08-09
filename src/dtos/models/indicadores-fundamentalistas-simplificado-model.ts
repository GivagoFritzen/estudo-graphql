import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class IndicadoresFundamentalistasSimplificado {
    @Field()
    p_l: number;
    @Field()
    p_vp: number;
    @Field()
    dividendYieldPorcentagem: number;
    @Field()
    crescimentoReceitaCincoAnosPorcentagem: number;

    @Field()
    lpa: number;
    @Field()
    vpa: number;
    @Field()
    margemLiquidaPorcentagem: number;
    @Field()
    ebit_AtivoPorcentagem: number;
    @Field()
    roePorcentagem: number;
}
