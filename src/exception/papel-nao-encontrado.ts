class PapelNaoEncontrado extends Error {
    constructor(papel: String) {
        super(`Papel ${papel} não encontrado`);
        this.name = 'PapelNaoEncontrado';
    }
}

export default PapelNaoEncontrado;