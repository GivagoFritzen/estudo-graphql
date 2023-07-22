import { Field, InputType } from "type-graphql";

@InputType()
export class AcaoInput {
    @Field()
    papel: String;
}