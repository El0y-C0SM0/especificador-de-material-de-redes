import { 
    ComponenteModel as Componente, 
    TiposModels as Tipos 
} from "../../exports/modelsExports.js"

class AreaDeTrabalho {
    constructor(pontosTelecom) {
        this.patchCords = new Map();
        this.micelaneas = new Map();
        this.pontosTelecom = pontosTelecom;
    }
    get pontosTelecom() {
        return this._pontosTelecom;
    }
    set pontosTelecom(pontosTelecom) {
        this._pontosTelecom = pontosTelecom;
        let totalPontos = 0;
        let quantidadeTomadas = 0;
        pontosTelecom.forEach(ponto => {
            totalPontos += ponto.quantidade;
            quantidadeTomadas += ponto.quantidade;
            let tipoCabo = Tipos.TipoPontoTelecom.toTipoPatchCord(ponto.tipo);
            this.patchCords.set(tipoCabo, new Componente(ponto.quantidade, Tipos.TipoUnidadeQuantidades.UNIDADE, tipoCabo));
        });
        this.tomadasFemeas = new Componente(quantidadeTomadas, Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoConector.CAT6);
        this.micelaneas.set(Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO, new Componente(quantidadeTomadas + (quantidadeTomadas / 2), // tomadas + espelhos
        Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO));
    }
    get numeroDiciplinas() {
        return this.pontosTelecom == null ? 0 : this.pontosTelecom.size;
    }
    get numeroConectores() {
        return this.tomadasFemeas == null ? 0 : this.tomadasFemeas.quantidade;
    }
}

export default AreaDeTrabalho;