import { Arg, Query, Resolver } from "type-graphql";
import { Acao } from "../dtos/models/acao-model";
import { AcaoInput } from "../dtos/inputs/acao-input";

const webScraper = require('../fundamentus-scraping');

@Resolver(() => Acao)
export class AcoesResolver {
    @Query(() => [Acao])
    async acoes() {
        return await webScraper.getAcoesEmpresasBolsaB3()
    }


    @Query(() => Acao)
    async acao(@Arg('data') data: AcaoInput) {
        await webScraper.getInfoAcao(data.papel);

        let novaAcao = new Acao();
        novaAcao.papel = "";
        novaAcao.nomeComercial = "";
        novaAcao.razaoSocial = "Teste";
        return novaAcao;
    }
}