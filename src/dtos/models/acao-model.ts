import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Acao {
    @Field()
    papel: String;

    @Field()
    nomeComercial: String;

    @Field()
    razaoSocial: String;
}