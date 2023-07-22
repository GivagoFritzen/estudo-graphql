import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DadosBalancoPatrimonial {
    @Field()
    ativo: number;
    @Field()
    disponibilidades: number;
    @Field()
    ativoCirculante: number;
    @Field()
    dividaBruta: number;
    @Field()
    dividaLiquida: number;
    @Field()
    patrimonioLiquido: number;
}