import {
    ComponenteModel as Componente,
    TiposModels as tps,
    WorkspaceModel as Workspace, 
    SalaTelecomModel as SalaTelecom
} from "../exports/modelsExports.js";

import { 
    Checkbox, 
    InputFloat
} from "../exports/formsExports.js";

class PavimentoForm {
    numPavimento;
    rackAbertoChecbox;
    malhaHorizontalInput;
    pontoRedeInput;
    pontoCftvInput;
    pontoVoipInput;
    id;

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
            90,
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

        this.id = `pavimento-${numPavimento}`
    }

    get html() {
        return `
            <div id=${this.id} class="pavimento">
                <h3>Pavimento ${this.numPavimento + 1}</h3>
                ${this.rackAbertoChecbox.html}
                ${this.malhaHorizontalInput.html}
                <div id="ponto-telecom-pavimento-${this.numPavimento}" class="pontos-telecom">
                    ${this.pontoRedeInput.html}
                    ${this.pontoCftvInput.html}
                    ${this.pontoVoipInput.html}
                </div>
            </div>
        `
    }

    get $element() {
        let $element = $(`
            <div id=${this.id} class="pavimento">
                <h3>Pavimento ${this.numPavimento + 1}</h3>
            </div>
        `);

        $element.addClass("pavimento");
    
        $element.append(this.rackAbertoChecbox.$element);
        $element.append(this.malhaHorizontalInput.$element);
    
        let $pontoTelecomDiv = $(`
            <div id="pontos-telecom-pavimento-${this.numPavimento}" class="pontos-telecom">
            </div>
        `);
    
        $pontoTelecomDiv.append(this.pontoRedeInput.$element);
        $pontoTelecomDiv.append(this.pontoCftvInput.$element);
        $pontoTelecomDiv.append(this.pontoVoipInput.$element);
    
        $element.append($pontoTelecomDiv);

        return $element;
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

            let workspace = new Workspace(pontos);

            return new SalaTelecom(
                workspace,
                comprimentoMalhaHorizontal,
                this.numPavimento,
                rackAberto
            );
        } catch (error) {
            console.error(error);
        }
    }
}

export default PavimentoForm;