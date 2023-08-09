class PapelNaoBanco extends Error {
    constructor(papel: String) {
        super(`Papel ${papel} não é do setor bancário, para buscar essas informações utilizar o endpoint getDetalhesAcoes`);
        this.name = 'PapelBanco';
    }
}

export default PapelNaoBanco;