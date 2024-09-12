export class DistanciaInvalidaError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "DistanciaInvalidaError";
    }
}

export class TamanhoRackInvalidoError extends Error {
    altura: number = 0;

    constructor(mensagem: string, altura: number) {
        super(mensagem);
        this.altura = altura;
        this.name = "DistanciaInvalidaError";
    }
}
