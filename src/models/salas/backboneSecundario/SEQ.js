class SEQ {

    constructor(peDireito, quantPavimentos, andarSEQ, sets) {
        
        this._peDireito = peDireito;
        this._quantPavimentos = quantPavimentos;
        this._andarSEQ = andarSEQ;
        this._sets = sets;
        
    }

    get peDireito() {
        return this._peDireito;
    }

    get quantPavimentos() {
        return this._quantPavimentos;
    }

    get andarSEQ() {
        return this._andarSEQ;
    }

    get sets() {
        return this._sets;
    }

    get nFibras() {
        let _nFibras = 0;

        this.sets.forEach(set => {
            _nFibras += set.nFibras;
        })
        
        return _nFibras;
    }

}

export default SEQ;