import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DetalhesGerais {
  @Field()
  papel: String;
  @Field()
  tipo: String;
  @Field()
  setor: String;
  @Field()
  subsetor: String;

  @Field()
  cotacao: number;
  @Field()
  minUltimasCinquentaDuasSemanas: number;
  @Field()
  maxUltimasCinquentaDuasSemanas: number;
  @Field()
  volumeMedioNegociadoUltimosDoisMeses: number;

  @Field()
  valorMercado: number;
  @Field()
  valorFirma?: number;
  @Field()
  ultimoBalancoProcessado: String;
  @Field()
  numeroAcoes: number;
}
