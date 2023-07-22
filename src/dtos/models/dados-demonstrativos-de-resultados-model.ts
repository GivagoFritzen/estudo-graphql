import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DadosDemonstrativosDeResultados {
  @Field()
  receitaLiquida: number;
  @Field()
  ebit: number;
  @Field()
  lucroLiquido: number;
}
