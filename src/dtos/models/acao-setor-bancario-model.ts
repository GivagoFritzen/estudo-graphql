import { Field, ObjectType } from "type-graphql";
import { DadosBalancoPatrimonialBancario, DadosDemonstrativosDeResultadosBancario, IndicadoresFundamentalistasSimplificado, Oscilacoes } from ".";
import { DetalhesGerais } from "./detalhes-gerais-model";

@ObjectType()
export class AcaoSetorBancario extends DetalhesGerais {
    @Field()
    oscilacoes: Oscilacoes;
    @Field()
    indicadoresFundamentalistas: IndicadoresFundamentalistasSimplificado;
    @Field()
    dadosBalancoPatrimonial: DadosBalancoPatrimonialBancario;

    @Field()
    dadosDemonstrativosDeResultadosUltimosDozeMeses: DadosDemonstrativosDeResultadosBancario;
    @Field()
    dadosDemonstrativosDeResultadosUltimosTresMeses: DadosDemonstrativosDeResultadosBancario;
}