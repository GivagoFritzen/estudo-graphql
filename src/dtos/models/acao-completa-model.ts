import { Field, ObjectType } from "type-graphql";
import { DadosBalancoPatrimonial, DadosDemonstrativosDeResultados, IndicadoresFundamentalistas, Oscilacoes } from ".";
import { DetalhesGerais } from "./detalhes-gerais-model";

@ObjectType()
export class AcaoCompleta extends DetalhesGerais {
    @Field()
    oscilacoes: Oscilacoes;
    @Field()
    indicadoresFundamentalistas: IndicadoresFundamentalistas;
    @Field()
    dadosBalancoPatrimonial: DadosBalancoPatrimonial;

    @Field()
    dadosDemonstrativosDeResultadosUltimosDozeMeses: DadosDemonstrativosDeResultados;
    @Field()
    dadosDemonstrativosDeResultadosUltimosTresMeses: DadosDemonstrativosDeResultados;
}