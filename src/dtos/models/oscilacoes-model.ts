import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Oscilacoes {
    @Field()
    diaPorcentagem: number;
    @Field()
    mesPorcentagem: number;
    @Field()
    trintaDiasPorcentagem: number;
    @Field()
    dozeMesesPorcentagem: number;
    @Field()
    anoAnteriorPorcentagem: number;
    @Field()
    doisAnosAntesPorcentagem: number;
    @Field()
    tresAnosAntesPorcentagem: number;
    @Field()
    quatroAnosAntesPorcentagem: number;
}