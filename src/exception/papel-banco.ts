class PapelBanco extends Error {
    constructor(papel: String) {
        super(`Papel ${papel} é do setor bancário, para buscar essas informações utilizar o endpoint X`);
        this.name = 'PapelBanco';
    }
}

export default PapelBanco;