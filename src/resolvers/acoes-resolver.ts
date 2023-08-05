import { Arg, Query, Resolver } from "type-graphql";
import { Acao } from "../dtos/models/acao-model";
import { AcaoInput } from "../dtos/inputs/acao-input";
import { AcaoCompleta } from "../dtos/models/acao-completa-model";

const webScraper = require('../fundamentus-scraping');

@Resolver()
export class AcoesResolver {
    @Query(() => [Acao])
    async getPapeis() {
        return await webScraper.getAcoesEmpresasBolsaB3()
    }


    @Query(() => [AcaoCompleta])
    async getDetalhesAcoes(@Arg('data') data: AcaoInput) {
        return await webScraper.getInfoAcao(data.papeis);
    }
}