import { Arg, Query, Resolver } from "type-graphql";
import { AcaoInput } from "../dtos/inputs/acao-input";
import { WebScraper } from "../fundamentus-scraping";
import { Acao, AcaoCompleta, AcaoSetorBancario } from "../dtos/models";

@Resolver()
export class AcoesResolver {
    @Query(() => [Acao])
    async getPapeis() {
        return await WebScraper.getAcoesEmpresasBolsaB3()
    }

    @Query(() => [AcaoCompleta])
    async getDetalhesAcoes(@Arg('data') data: AcaoInput) {
        return await WebScraper.getInfoAcao(data.papeis);
    }


    @Query(() => [AcaoSetorBancario])
    async getDetalhesAcoesBancaria(@Arg('data') data: AcaoInput) {
        return await WebScraper.getInfoAcaoBancarias(data.papeis);
    }
}