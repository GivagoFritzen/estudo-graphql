import { Field, InputType } from "type-graphql";

@InputType()
export class AcaoInput {  
    @Field(() => [String])
    papeis: String[];
}