import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DadosDemonstrativosDeResultadosBancario {
    @Field()
    resultadoDeIntermediacaoFinanceira: number;
    @Field()
    receitaDeServicos: number;
    @Field()
    lucroLiquido: number;
}
