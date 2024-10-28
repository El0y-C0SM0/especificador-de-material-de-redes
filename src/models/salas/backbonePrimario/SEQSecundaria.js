class SEQSecundaria {

    constructor(id, tipoFibra, distancia, cftv, dados, voip) {

        this._id = id;
        this._tipoFibra = tipoFibra;     
        this._distancia = distancia;
        this._nFibras = (1+cftv+dados+voip)*2;

    }

    get id() {
        return this._id;
    }

    get tipoFibra() {
        return this._tipoFibra;
    } 

    get distancia() {
        return this._distancia;
    }

    get nFibras() {
        return this._nFibras;
    }


}

export default SEQSecundaria;