import { Field, ObjectType } from "type-graphql";
import { Oscilacoes } from "./oscilacoes-model";
import { IndicadoresFundamentalistas } from "./indicadores-fundamentalistas-model";
import { DadosBalancoPatrimonial } from "./dados-balanco-patrimonial-model";
import { DadosDemonstrativosDeResultados } from "./dados-demonstrativos-de-resultados-model";

@ObjectType()
export class AcaoCompleta {
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
    valorFirma: number;
    @Field()
    ultimoBalancoProcessado: String;
    @Field()
    numeroAcoes: number;

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