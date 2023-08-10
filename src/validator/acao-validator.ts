export class AcaoValidator {
    static papelExist = ($: any): boolean => {
        const pageText = $('body').text();
        return !pageText.includes("Nenhum papel encontrado");
    }

    static papelIsBanco = ($: any): boolean => {
        const pageText = $('body').text();
        return !pageText.includes("Result Int Financ");
    }
}
