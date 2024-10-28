import { 
    SETModel as SET,
    TiposModels as tps
}  from '../../exports/modelsExports.js';
import {
    Checkbox,
    InputInt,
    SelectField
} from '../../exports/formsExports.js';

class SETForm {

    //nPavimento, velocidade, tipoFibra, cftv, dados, voip

    constructor(numPavimento) {

        this.numPavimento = numPavimento;
        this.id = `set-${ numPavimento }`;

        this.tipoFibraRecebidaSelectField = new SelectField(
            "Tipo de fibra recebida:",
            {
                [tps.TipoFibraOptica.FOMMIG_50_125]: "Fibra óptica Multimodo 50 x 125µm",
                [tps.TipoFibraOptica.FOSM_9_125]: "Fibra óptica Monomodo 9 x 125µm"
            },
            "tipo-fibra-recebidas-select-field",
            tps.TipoFibraOptica.FOSM_9_125
        )

        this.atendeCftvInput = new Checkbox(
            "Atende CFTV:",
            `atende-cftv-${numPavimento}`,
            false
        );

        this.atendeDadosInput = new Checkbox(
            "Atende Dados:",
            `atende-dados-${numPavimento}`,
            true
        );

        this.atendeVoipInput = new Checkbox(
            "Atende VoiP:",
            `atende-voip-${numPavimento}`,
            false
        );

        $('body')[0].offsetHeight;

    }

    get html() {
        return `
            <article id=${this.id} class="set">
                <h2>SET do ${this.numPavimento + 1}º Andar.</h2>
                ${this.tipoFibraRecebidaSelectField.html}
                <div id="disciplinas-${this.numPavimento}" class="disciplinas">
                    ${this.atendeCftvInput.html}
                    ${this.atendeDadosInput.html}
                    ${this.atendeVoipInput.html}
                </div>
            </article>
        `
    }

    get $element() {

        let $section = $(`<article id="${this.id}" class="set"></article>`);


        let $h2 = $(`<h2>SET do ${this.numPavimento + 1}º Andar.</h2>`);

        let $setFormDiv = $(`<div class="set-form"></div>`);
        $setFormDiv.append(this.tipoFibraRecebidaSelectField.$element);
    
        let $disciplinasDiv = $(`
            <div id="disciplinas-${this.numPavimento+1}" class="disciplinas">
            </div>
        `);

        $disciplinasDiv.append(this.atendeCftvInput.$element);
        $disciplinasDiv.append(this.atendeDadosInput.$element);
        $disciplinasDiv.append(this.atendeVoipInput.$element);
    
        $section.append($h2);
        $section.append($setFormDiv);
        $section.append($disciplinasDiv);
    
        return $section;
        
    }

    get isValid() {

        return true;

    }

    carregarSET() {

        if (!this.isValid) return undefined;


        const numPavimento = this.numPavimento;
        const tipoFibraRecebida = this.tipoFibraRecebidaSelectField.value;
        const atendeCftv = this.atendeCftvInput.value;
        const atendeDados = this.atendeDadosInput.value;
        const atendeVoip = this.atendeVoipInput.value;

        return new SET(
            numPavimento,
            tipoFibraRecebida,
            atendeCftv,
            atendeDados,
            atendeVoip
        )

    }

}

export default SETForm;