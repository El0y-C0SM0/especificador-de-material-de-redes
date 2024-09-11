export class DistanciaInvalidaError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "DistanciaInvalidaError";
    }
}
