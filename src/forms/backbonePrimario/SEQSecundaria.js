import {
    InputInt, 
    SelectField 
} from "../../exports/formsExports.js";

import { 
    TiposModels as tps, 
    SEQSecundariaModel as SEQSecundaria
} from "../../exports/modelsExports.js";

import { Checkbox } from "../inputs.js";

class SEQSecundariaForm {
    // forms

    constructor(numeroSEQ) {

        this.numeroSEQ = numeroSEQ;
        this.id = `seq-${numeroSEQ}`;
        
        this.tipoFibraRecebidaSelectField = new SelectField(
            "Tipo de fibra recebida:",
            {
                [tps.TipoFibraOptica.FOMMIG_50_125]: "Fibra óptica Multimodo 50 x 125µm",
                [tps.TipoFibraOptica.FOSM_9_125]: "Fibra óptica Monomodo 9 x 125µm"
            },
            "tipo-fibra-recebidas-select-field",
            tps.TipoFibraOptica.FOSM_9_125
        )

        this.distanciaDaSEQPrincipalInput = new InputInt(
            "Distância da SEQ principal (em metros):",
            "distancia-da-seq-principal-input",
            0,
            40_000,
            150,
            false,
            50
        );

        this.atendeCftvInput = new Checkbox(
            "Atende CFTV:",
            `atende-cftv-${numeroSEQ}`,
            false
        );

        this.atendeDadosInput = new Checkbox(
            "Atende Dados:",
            `atende-dados-${numeroSEQ}`,
            true
        );

        this.atendeVoipInput = new Checkbox(
            "Atende VoiP:",
            `atende-voip-${numeroSEQ}`,
            false
        );
        
    }

    get html() {
        return `
            <article id="${this.id}" class="seq">
                <h2>SEQ Secundária ${this.numeroSEQ + 1}</h2>
                <div class="seq-form">
                    ${this.tipoFibraRecebidaSelectField.html}
                    ${this.distanciaDaSEQPrincipalInput.html}
                </div>
                <div id="disciplinas-${this.numPavimento}" class="disciplinas">
                    ${this.atendeCftvInput.html}
                    ${this.atendeDadosInput.html}
                    ${this.atendeVoipInput.html}
                </div>
            </article>
        `
    }

    get $element() {
        let $section = $(`<article id="${this.id}" class="seq"></section>`);
    
        let $h2 = $(`<h2>SEQ Secundária ${this.numeroSEQ+1}</h2>`);
        $section.append($h2);
    
        let $seqFormDiv = $(`<div class="seq-form"></div>`);
    
        $seqFormDiv.append(this.tipoFibraRecebidaSelectField.$element);
        $seqFormDiv.append(this.distanciaDaSEQPrincipalInput.$element);

        let $disciplinasDiv = $(`
            <div id="disciplinas-${this.numeroSEQ+1}" class="disciplinas">
            </div>
        `);

        $disciplinasDiv.append(this.atendeCftvInput.$element);
        $disciplinasDiv.append(this.atendeDadosInput.$element);
        $disciplinasDiv.append(this.atendeVoipInput.$element);
    
        $section.append($seqFormDiv);
        $section.append($disciplinasDiv);
    
        return $section;
    }

    get isValid() {
        let valid = true;
        
        valid &= this.distanciaDaSEQPrincipalInput.value >= 0 
        valid &= this.distanciaDaSEQPrincipalInput.value <= 40_000;

        return valid;
    }

    carregarSEQSecundaria() {
        if (!this.isValid) return undefined;
        
        const tipoFibra = this.tipoFibraRecebidaSelectField.value;
        const distanciaSEQ = this.distanciaDaSEQPrincipalInput.value;
        const atendeCftv = this.atendeCftvInput.value;
        const atendeDados = this.atendeDadosInput.value;
        const atendeVoip = this.atendeVoipInput.value;

        return new SEQSecundaria(
            this.numeroSEQ,
            tipoFibra,
            distanciaSEQ,
            atendeCftv,
            atendeDados,
            atendeVoip
        );
    }
}

export default SEQSecundariaForm;