import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DadosBalancoPatrimonialBancario {
    @Field()
    ativo: number;
    @Field()
    depositos: number;
    @Field()
    carteiraDeCredito: number;
    @Field()
    patrimonioLiquido: number;
}