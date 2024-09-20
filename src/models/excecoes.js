export class DistanciaInvalidaError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "DistanciaInvalidaError";
    }
}
export class TamanhoRackInvalidoError extends Error {
    constructor(mensagem, altura) {
        super(mensagem);
        this.altura = 0;
        this.altura = altura;
        this.name = "DistanciaInvalidaError";
    }
}
//# sourceMappingURL=excecoes.js.map