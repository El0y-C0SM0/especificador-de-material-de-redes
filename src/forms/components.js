import { Checkbox, InputFloat, SelectField } from "./inputs.js";
import * as tps from "../models/tipos.js"
import { Componente } from "../models/componente.js";
import { AreaDeTrabalho, SalaDeTelecom } from "../models/salas.js";

export class PavimentoForm {
    numPavimento;
    rackAbertoChecbox;
    malhaHorizontalInput;
    pontoRedeInput;
    pontoCftvInput;
    pontoVoipInput;

    constructor(numPavimento) {
        this.numPavimento = numPavimento;
        this.rackAbertoChecbox = new Checkbox(
            'Rack aberto:', 
            `rack-aberto-${numPavimento}`,
            false
        );
        this.malhaHorizontalInput = new InputFloat(
            "Comprimento da malha horizontal:",
            `malha-horizontal-${numPavimento}`,
            1,
            undefined,
            10,
            false,
            undefined
        );
        this.pontoRedeInput = new InputFloat(
            "Pontos de rede:",
            `pontos-rede-${numPavimento}`,
            0,
            undefined,
            10,
            false,
            undefined
        );
        this.pontoCftvInput = new InputFloat(
            "Pontos de CFTV:",
            `pontos-cftv-${numPavimento}`,
            0,
            undefined,
            10,
            false,
            undefined
        );
        this.pontoVoipInput = new InputFloat(
            "Pontos de VoIP:",
            `pontos-voip-${numPavimento}`,
            0,
            undefined,
            10,
            false,
            undefined
        );
    }

    get html() {
        return `
            <div class="pavimento">
                <h3>Pavimento ${this.numPavimento + 1}</h3>
                ${this.rackAbertoChecbox.html}
                ${this.malhaHorizontalInput.html}
                <div id="ponto-telecom-pavimento-${this.numPavimento}">
                    ${this.pontoRedeInput.html}
                    ${this.pontoCftvInput.html}
                    ${this.pontoVoipInput.html}
                </div>
            </div>
        `
    }

    get isValid() {
        let valid = true;

        valid = valid && this.malhaHorizontalInput.isValid;
        valid = valid && this.pontoRedeInput.isValid;
        valid = valid && this.pontoCftvInput.isValid;
        valid = valid && this.pontoVoipInput.isValid;

        return valid
    }

    carregarSalaTelecom() {
        if (!this.isValid) return undefined;

        const rackAberto = this.rackAbertoChecbox.value;
        const comprimentoMalhaHorizontal = this.malhaHorizontalInput.value;
        const pontosRede = this.pontoRedeInput.value;
        const pontosCFTV = this.pontoCftvInput.value;
        const pontosVoIP = this.pontoVoipInput.value;

        try {
            let pontos = new Map();

            if (pontosRede > 0) {
                pontos.set(tps.TipoPontoTelecom.REDE, 
                    new Componente(
                        pontosRede, 
                        tps.TipoUnidadeQuantidades.UNIDADE, 
                        tps.TipoPontoTelecom.REDE
                    )
                );
            }

            if (pontosCFTV > 0) {
                pontos.set(tps.TipoPontoTelecom.CFTV, 
                    new Componente(
                        pontosCFTV, 
                        tps.TipoUnidadeQuantidades.UNIDADE, 
                        tps.TipoPontoTelecom.CFTV
                    )
                );
            }

            if (pontosVoIP > 0) {
                pontos.set(tps.TipoPontoTelecom.VOIP, 
                    new Componente(
                        pontosVoIP, 
                        tps.TipoUnidadeQuantidades.UNIDADE, 
                        tps.TipoPontoTelecom.VOIP
                    )
                );
            }

            let areaDeTrabalho = new AreaDeTrabalho(pontos); 

            console.warn(areaDeTrabalho.numeroDiciplinas);

            return undefined;
            // return new SalaDeTelecom(
            //     areaDeTrabalho,
            //     comprimentoMalhaHorizontal,
            //     this.numPavimento,
            //     rackAberto
            // );
        } catch (error) {
            console.error(error);
        }
    }
}

export class SalaDeEquipamentosForm {
    alturaAndarInput;
    numeroPavimentoInput;
    pavimentoPrincipalInput;
    numeroFibrasRecebidas;
    tipoFibraRecebidasSelectField;

    
}