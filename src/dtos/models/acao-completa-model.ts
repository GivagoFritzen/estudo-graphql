import { Field, ObjectType } from "type-graphql";
import { Acao } from "./acao-model";
import { Ocilacoes } from "./oscilacoes-model";
import { IndicadoresFundamentalistas } from "./indicadores-fundamentalistas-model";
import { DadosBalancoPatrimonial } from "./dados-balanco-patrimonial-model";
import { DadosDemonstrativosDeResultados } from "./dados-demonstrativos-de-resultados-model";

@ObjectType()
export class AcaoCompleta extends Acao {
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
    volumeMedioNegociadoUltimosDoisMeses: String;

    @Field()
    valorMercado: number;
    @Field()
    valorFirma: number;
    @Field()
    ultimoBalancoProcessado: Date;
    @Field()
    numeroAcoes: number;

    @Field()
    ocilacoes: Ocilacoes;
    @Field()
    indicadoresFundamentalistas: IndicadoresFundamentalistas;
    @Field()
    dadosBalancoPatrimonial: DadosBalancoPatrimonial;

    @Field()
    dadosDemonstrativosDeResultadosUltimosDozeMeses: DadosDemonstrativosDeResultados;
    @Field()
    dadosDemonstrativosDeResultadosUltimosTresMeses: DadosDemonstrativosDeResultados;
}