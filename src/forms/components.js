import { Checkbox, InputFloat, InputInt, SelectField } from "./inputs.js";
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

        this.id = `pavimento-${numPavimento}`
    }

    get html() {
        return `
            <article id=${this.id} class="pavimento">
                <h3>Pavimento ${this.numPavimento + 1}</h3>
                ${this.rackAbertoChecbox.html}
                ${this.malhaHorizontalInput.html}
                <div id="ponto-telecom-pavimento-${this.numPavimento}">
                    ${this.pontoRedeInput.html}
                    ${this.pontoCftvInput.html}
                    ${this.pontoVoipInput.html}
                </div>
            </article>
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
            <div id="pontos-telecom-pavimento-${this.numPavimento}">
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
    // forms
    alturaAndarInput;
    numeroPavimentosInput;
    pavimentoPrincipalInput;
    numeroFibrasRecebidasInput;
    tipoFibraRecebidasSelectField;

    // atributos
    numeroSEQ;
    id;
    pavimentos;

    constructor(numeroSEQ) {
        this.numeroSEQ = numeroSEQ;
        this.id = `seq-${numeroSEQ}`;
        this.pavimentos = [new PavimentoForm(0)];

        this.alturaAndarInput = new InputFloat(
            "Altura dos andares:", 
            "altura-andar-input", 
            1,
            10,
            5,
            false,
            1
        );

        this.numeroFibrasRecebidasInput = new InputInt(
            "Número de fibras recebidas:",
            "numero-fibras-recebidas-input",
            4,
            24,
            4,
            false,
            4
        );
        
        this.tipoFibraRecebidasSelectField = new SelectField(
            "Tipo de fibra recebida:",
            {
                [tps.TipoFibraOptica.FOMMIG_50_125]: "Fibra óptica Multimodo 50 x 125µm",
                [tps.TipoFibraOptica.FOSM_9_125]: "Fibra óptica Monomodo 9 x 125µm"
            },
            "tipo-fibra-recebidas-select-field",
            tps.TipoFibraOptica.FOSM_9_125
        )

        this.numeroPavimentosInput = new InputInt(
            "Número de pavimentos:",
            "numero-pavimentos-input",
            1,
            24,
            1,
            false,
            undefined          
        );

        this.pavimentoPrincipalInput = new InputInt(
            "Pavimento principal:",
            "pavimento-principal-input",
            1,
            24,
            1,
            false,
            1
        );
    
        this.numeroPavimentosInput.onUpdate(quantidadePavimentos => {
            let $pavimentos = $(`#${this.id} .pavimento`);

            while (this.pavimentos.length > quantidadePavimentos) {
                this.pavimentos.pop();
                $pavimentos.last().remove();
            }

            while (this.pavimentos.length < quantidadePavimentos) {
                let novoPavimento = new PavimentoForm(this.pavimentos.length);

                this.pavimentos.push(novoPavimento);
                $(`#${this.id} .seq-pavimentos`).append($(novoPavimento.html));
            }

            $('body')[0].offsetHeight; // força o recálculo do tamanho do body
        });
    }

    get html() {
        return `
            <section id="${this.id}" class="seq">
                <h2>Sala de equipamentos ${this.numeroSEQ >= 0 ? this.numeroSEQ + 1 : ''}</h2>
                <div class="seq-form">
                    ${this.tipoFibraRecebidasSelectField.html}
                    ${this.numeroFibrasRecebidasInput.html}
                    ${this.alturaAndarInput.html}
                    ${this.numeroPavimentosInput.html}
                    ${this.pavimentoPrincipalInput.html}
                </div>
                <div class="seq-pavimentos">
                    ${this.pavimentos.map(pavimento => pavimento.html).join('\n')}
                </div>
            </section>
        `
    }

    get $element() {
        let $section = $(`<section id="${this.id}" class="seq"></section>`);
    
        let $h2 = $(`<h2>Sala de equipamentos ${this.numeroSEQ >= 0 ? this.numeroSEQ + 1 : ''}</h2>`);
        $section.append($h2);
    
        let $seqFormDiv = $(`<div class="seq-form"></div>`);
    
        $seqFormDiv.append(this.tipoFibraRecebidasSelectField.$element);
        $seqFormDiv.append(this.numeroFibrasRecebidasInput.$element);
        $seqFormDiv.append(this.alturaAndarInput.$element);
        $seqFormDiv.append(this.numeroPavimentosInput.$element);
        $seqFormDiv.append(this.pavimentoPrincipalInput.$element);
    
        $section.append($seqFormDiv);
    
        let $seqPavimentosDiv = $(`<div class="seq-pavimentos"></div>`);
    
        this.pavimentos.forEach(pavimento => pavimento.$element);
    
        $section.append($seqPavimentosDiv);
    
        return $section;
    }

    get isValid() {
        let valid = true;

        valid = valid && this.numeroFibrasRecebidasInput.isValid;
        valid = valid && this.alturaAndarInput.isValid;
        valid = valid && this.numeroPavimentosInput.isValid;
        valid = valid && this.pavimentoPrincipalInput.isValid && (
            this.pavimentoPrincipalInput.value <= this.numeroPavimentosInput.value
        );
        valid = valid && this.pavimentos.every(pavimento => pavimento.isValid);

        return valid;
    }

    carregarSEQ() {

    }
}