class SET {

    constructor(nPavimento, tipoFibra, cftv, dados, voip) {

        this._nPavimento = nPavimento;
        this._tipoFibra = tipoFibra;
        this._nFibras = (1+cftv+dados+voip)*2;

    }

    get nPavimento () {
        return this._nPavimento;
    }

    get tipoFibra() {
        return this._tipoFibra;
    }

    get nFibras() {
        return this._nFibras;
    }

}

export default SET;