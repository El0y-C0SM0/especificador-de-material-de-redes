class SEQPrimaria {

    constructor(seqs) {
    
        this._seqs = seqs;

    }

    get seqs() {
        return this._seqs;
    }

    get nFibras() {
        let _nFibras = 0;

        this.seqs.forEach(seq => {
            _nFibras += seq.nFibras;
        })
        
        return _nFibras;

    }

}

export default SEQPrimaria;