import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DadosDemonstrativosDeResultadosBancario {
    @Field()
    ResultadoDeIntermediacaoFinanceira: number;
    @Field()
    receitaDeServicos: number;
    @Field()
    lucroLiquido: number;
}
