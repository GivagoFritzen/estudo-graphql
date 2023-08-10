export class GenericMapper {
    protected static converterToInt(texto: String | number): number {
        if (typeof texto === 'number')
            return texto;

        return parseInt(
            texto.replace(',', '.')
                .replace('%', '')
                .replace(/\./g, "")
        );
    }

    protected static converterToFloat(texto: String | number): number {
        if (typeof texto === 'number') {
            return texto;
        }

        return parseFloat(
            texto.replace(',', '.').replace('%', '')
        );
    }

    protected static converterToDataAndGetYear(element: DetalhesPapel, backXYears = 0): number {
        const dataAtual = new Date().getFullYear();
        const currentYear = (dataAtual - backXYears).toString();

        if (!element.hasOwnProperty(currentYear))
            return 0;

        return this.converterToFloat(element[currentYear]);
    }
}
