import { Componente, EquipamentoRack, Rack } from "./componente";
import * as Tipos from './tipos';
import { DistanciaInvalidaError, } from "./excecoes";

export class AreaDeTrabalho {
    tomadasFemeas!: Componente<Tipos.TipoConector> | null;
    patchCords: Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>;
    micelaneas!: Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>;
    private _pontosTelecom!: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>;

    constructor(pontosTelecom: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>) {
        this.patchCords = new Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>();
        this.micelaneas = new Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>();        
        this.pontosTelecom = pontosTelecom;
    }

    get pontosTelecom(): Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>> {
        return this._pontosTelecom;
    }

    set pontosTelecom(
        pontosTelecom: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>
    ) {
        this._pontosTelecom = pontosTelecom;

        let totalPontos: number = 0;
        let quantidadeTomadas: number = 0;

        pontosTelecom.forEach(ponto => {
            totalPontos += ponto.quantidade;
            quantidadeTomadas += ponto.quantidade;

            let tipoCabo = Tipos.TipoPontoTelecom.toTipoPatchCord(ponto.tipo);
        
            this.patchCords.set(tipoCabo, new Componente<Tipos.TipoCaboUTP>(
                ponto.quantidade, 
                Tipos.TipoUnidadeQuantidades.UNIDADE, 
                tipoCabo
            ));
        });

        this.tomadasFemeas = new Componente<Tipos.TipoConector>(quantidadeTomadas, Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoConector.CAT6);
        this.micelaneas.set(Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO, new Componente<Tipos.TipoMicelanea>(
            quantidadeTomadas + (quantidadeTomadas / 2), // tomadas + espelhos
            Tipos.TipoUnidadeQuantidades.UNIDADE, 
            Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO
        ));
    }

    get numeroDiciplinas(): number {
        return this.pontosTelecom == null ? 0 : this.pontosTelecom.size;
    }

    get numeroConectores(): number {
        return this.tomadasFemeas == null ? 0 : this.tomadasFemeas.quantidade;
    }
}

export class SalaDeTelecom {
    rackAberto: boolean;
    // Pigtails são duplos nos TO e simples no DIO
    pigtails: Map<Tipos.TipoAcopladorPigtailCordao, Componente<Tipos.TipoAcopladorPigtailCordao>>;
    cordoes: Map<Tipos.TipoAcopladorPigtailCordao, Componente<Tipos.TipoAcopladorPigtailCordao>>;
    acopladores: Map<Tipos.TipoAcopladorPigtailCordao, Componente<Tipos.TipoAcopladorPigtailCordao>>; 
    micelaneas: Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>;
    // É tanto as fibras que redebem da SEQ primária quanto do provedor.
    fibrasOpticasRecebidas!: Componente<Tipos.TipoFibraOptica>; 
    areaDeTrabalho: AreaDeTrabalho;
    comprimentoMalhaHorizontal: number;
    numeroPiso: number;
    protected equipamentosAtivos!: Map<Tipos.TipoEquipamentoRack, EquipamentoRack>;

    constructor(
        areaDeTrabalho: AreaDeTrabalho, 
        comprimentoMalhaHorizontal: number, 
        numeroPiso: number, 
        rackAberto: boolean = false
    ) {
        this.areaDeTrabalho = areaDeTrabalho;
        this.rackAberto = rackAberto;
        this.equipamentosAtivos = new Map<Tipos.TipoEquipamentoRack, EquipamentoRack>();
        this.pigtails = new Map<Tipos.TipoAcopladorPigtailCordao, Componente<Tipos.TipoAcopladorPigtailCordao>>();
        this.cordoes = new Map<Tipos.TipoAcopladorPigtailCordao, Componente<Tipos.TipoAcopladorPigtailCordao>>();
        this.acopladores = new Map<Tipos.TipoAcopladorPigtailCordao, Componente<Tipos.TipoAcopladorPigtailCordao>>();
        this.micelaneas = new Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>();

        if (comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError(
                "Distancia dos pontos de telecom até a sala de telecom não deve exeder 90 metros"
            );
        }
            
        this.comprimentoMalhaHorizontal = comprimentoMalhaHorizontal;
        this.numeroPiso = numeroPiso;

        this.defineAtivos();
    }

    save(): void {
        if (this.comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError(
                "Distancia dos pontos de telecom até a sala de telecom não deve exeder 90 metros"
            );
        }

        this.defineAtivos();
    }

    protected defineAtivos(): void {
        this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.SWITCH_24, new EquipamentoRack(
            Tipos.TipoEquipamentoRack.SWITCH_24, 
            Math.ceil(this.areaDeTrabalho.numeroConectores / 24),
            1
        ));

        let tipoAcoplador: Tipos.TipoAcopladorPigtailCordao;
        let quantidadeAcopladores: number;

        if (this.fibrasOpticasRecebidas == undefined) return;

        if(this.numeroFibras <= 8) {
            this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO, new EquipamentoRack(
                Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO, 
                1, 
                0, 
            ));

            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(
                this.fibrasOpticasRecebidas.tipo,
                true
            );
            quantidadeAcopladores = this.numeroFibras / 2;

        } else {
            this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.DIO_24, new EquipamentoRack(
                Tipos.TipoEquipamentoRack.DIO_24, 
                Math.ceil(this.numeroFibras / 24), 
                1,
            ));
            
            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(
                this.fibrasOpticasRecebidas.tipo,
                false
            );
            quantidadeAcopladores = this.numeroFibras;
        }


        this.defineAcopladores(tipoAcoplador, quantidadeAcopladores);
    }

    protected defineAcopladores(
        tipoAcoplador: Tipos.TipoAcopladorPigtailCordao, 
        quantidadeAcopladores: number,
    ): void {
        this.pigtails.set(tipoAcoplador,
            new Componente<Tipos.TipoAcopladorPigtailCordao>(
                quantidadeAcopladores,
                Tipos.TipoUnidadeQuantidades.UNIDADE,
                tipoAcoplador,
            )
        );
    
        this.cordoes.set(tipoAcoplador,
            new Componente<Tipos.TipoAcopladorPigtailCordao>(
                quantidadeAcopladores,
                Tipos.TipoUnidadeQuantidades.UNIDADE,
                tipoAcoplador,
            )
        );
    
        this.acopladores.set(tipoAcoplador,
            new Componente<Tipos.TipoAcopladorPigtailCordao>(
                quantidadeAcopladores,
                Tipos.TipoUnidadeQuantidades.UNIDADE,
                tipoAcoplador,
            )
        );
    }

    get numeroFibras() {
        // 2 para cada diciplina mais 2 reserva para cada
        return this.areaDeTrabalho.numeroDiciplinas * 4;
    }

    get diciplinas() : Set<Tipos.TipoPontoTelecom> {
        let diciplinas = new Set<Tipos.TipoPontoTelecom>();

        this.areaDeTrabalho.pontosTelecom.forEach(ponto => diciplinas.add(ponto.tipo));

        return diciplinas;
    }

    get jumperCables(): Componente<Tipos.TipoCaboUTP> | undefined {
        let quantidadeSwitches = this.equipamentosAtivos.get(Tipos.TipoEquipamentoRack.SWITCH_24)?.quantidade;

        if (quantidadeSwitches == undefined) return undefined;

        let quantidade = this.racks.reduce((acc, rack) => acc + (rack?.jumperCables?.quantidade ?? 0), 0);


        return new Componente<Tipos.TipoCaboUTP>(
            quantidade,
            Tipos.TipoUnidadeQuantidades.UNIDADE,
            Tipos.TipoCaboUTP.CINZA_CAT7
        );
    }

    get equipamentos() : Map<Tipos.TipoEquipamentoRack, EquipamentoRack> {
        let equipamentos = new Map<Tipos.TipoEquipamentoRack, EquipamentoRack>();

        this.racks.forEach(rack => {
            rack.equipamentos.forEach(equipamento =>{
                let equipamentoSalvo = equipamentos.get(equipamento.tipo);

                if (equipamentoSalvo !== undefined) {
                    equipamentoSalvo.quantidade += equipamento.quantidade;
                    equipamentos.set(equipamento.tipo, equipamento);
                }

            })
        });

        return equipamentos
    }

    get patchCables(): Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>> {
        let patchCables = new Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>();

        this.areaDeTrabalho.pontosTelecom.forEach(ponto => {
            let tipo = Tipos.TipoPontoTelecom.toTipoPatchCable(ponto.tipo);

            patchCables.set(
                tipo,
                new Componente<Tipos.TipoCaboUTP>(
                    ponto.quantidade,
                    Tipos.TipoUnidadeQuantidades.UNIDADE,
                    tipo
                )
            );
        });

        return patchCables;
    }

    get racks(): Rack[] {
        let racks: Rack[] = [];

        // 20 por que ainda será contado os patch panels, exaustor e outros componentes.
        try {
            return [new Rack(this.equipamentosAtivos, this.rackAberto)];
        } catch (error: any) {
            /** Algoritmo da divisão de componentes
             * 
             * Como um rack tem limite máximo de 48u, preucupo-me em reservar um espaço para os
             * componetes que ainda serão postos. A estratégia de divisão é buscar preencher o maior
             * rack possivel, caso sobre, divide em racks de tamanhos similares e menores. Com os 
             * racks divididos, ele calcula como seria adcionar itens a cada rack seguindo a ordem de
             * disposição dos itens, sem mesclas.
             */

            let k = 1;
            for (; Rack.arredondaAltura(error.altura / k) < 48; k++);

            const fracao = Rack.arredondaAltura(error.altura / k);
            let cont = fracao;
            let selecionados = new Map<Tipos.TipoEquipamentoRack, EquipamentoRack>();

            this.equipamentosAtivos.forEach(equipamento => {
                if(cont - equipamento.quantidade < 0) {
                    selecionados.set(
                        equipamento.tipo,
                        new EquipamentoRack(
                            equipamento.tipo,
                            cont,
                            equipamento.alturaUnitaria
                        )
                    );

                    racks.push(new Rack(selecionados));
                    selecionados.clear();

                    selecionados.set(
                        equipamento.tipo,
                        new EquipamentoRack(
                            equipamento.tipo,
                            -(cont - equipamento.quantidade),
                            equipamento.alturaUnitaria
                        )
                    );
                    cont = fracao + cont - equipamento.quantidade;
                } else {
                    selecionados.set(equipamento.tipo, equipamento);
                }
            });

            racks.push(new Rack(selecionados));
        }

        return racks;
    }
}

export class SalaDeEquipamentos extends SalaDeTelecom {
    salasDeTelecom: SalaDeTelecom[];
    // SEQ secundarias
    salasDeEquipamento: SalaDeEquipamentos[];
    alturaAndares: number;
    // distancia que essa seq está da principal.
    distanciaSEQ: number;

    constructor(
        areaDeTrabalho: AreaDeTrabalho, 
        comprimentoMalhaHorizontal: number, 
        numeroPiso: number,
        alturaAndares: number,
        salasDeTelecom: SalaDeTelecom[],
        salasDeEquipamento: SalaDeEquipamentos[] = [], 
        distanciaSEQ: number = 0, 
        rackAberto: boolean = false,
        quantidadeFibrasRecebidas: number = 12,
        tipoFibrasRecebidas: Tipos.TipoFibraOptica = Tipos.TipoFibraOptica.FOSM_9_125
    ) {
        super(areaDeTrabalho, comprimentoMalhaHorizontal, numeroPiso, rackAberto=rackAberto);
        this.salasDeTelecom = salasDeTelecom;
        this.salasDeEquipamento = salasDeEquipamento;
        this.distanciaSEQ = distanciaSEQ;
        this.alturaAndares = alturaAndares;

        this.defineFibrasOpticas(quantidadeFibrasRecebidas, tipoFibrasRecebidas);

        this.defineAtivos();
    }

    save(): void {
        super.save();

        this.defineFibrasOpticas()
        this.defineAtivos();
    }

    // informa o tipo da fibra que leva até as SEQ e SET
    get tipoFibra(): Tipos.TipoFibraOptica {
        let maiorFibra = 0;

        if (this.salasDeEquipamento == undefined)
            return Tipos.TipoFibraOptica.FOMMIG_50_125;

        if(this?.salasDeEquipamento?.length == 0) {
            let sortedSalasDeTelecom = this?.salasDeTelecom?.slice().sort((a, b) => {
                return a.numeroPiso - b.numeroPiso;
            });

            maiorFibra = Math.max(...sortedSalasDeTelecom.map(sala => {
                return Math.abs(this.numeroPiso - sala.numeroPiso + 1) * this.alturaAndares; 
            }));
        } else if (this?.salasDeEquipamento?.length != 0) {
            let sortedSalaDeEquipamentos = this?.salasDeEquipamento?.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);

            maiorFibra = Math.max(...sortedSalaDeEquipamentos.map(sala => sala.distanciaSEQ));
        }

        return Tipos.TipoFibraOptica.getTipoFibra(maiorFibra);
    }

    get diciplinas(): Set<Tipos.TipoPontoTelecom> {
        let diciplinas = super.diciplinas;

        this?.salasDeTelecom?.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });

        this?.salasDeEquipamento?.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });

        return diciplinas;
    }

    // informa o numero de fibras que leva até as SEQ e SET
    get numeroFibras() : number {
        let numeroFibras = 0;

        this?.salasDeTelecom?.forEach(sala => numeroFibras += sala.numeroFibras);
        this?.salasDeEquipamento?.forEach(sala => numeroFibras += sala.numeroFibras);
        numeroFibras += super.numeroFibras;

        return (numeroFibras == 0 ? super.numeroFibras : numeroFibras);
    }

    get fibraBackbone(): Componente<Tipos.TipoFibraOptica> {
        let distancia = 0;
        
        let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
            return a.numeroPiso - b.numeroPiso;
        });

        sortedSalasDeTelecom.forEach(sala => {
            distancia += (Math.abs(this.numeroPiso - sala.numeroPiso) + 2) * this.alturaAndares; 
        });

        let sortedSalaDeEquipamentos = this.salasDeEquipamento.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);

        sortedSalaDeEquipamentos.forEach(sala => distancia += sala.distanciaSEQ);


        return new Componente<Tipos.TipoFibraOptica>(distancia, Tipos.TipoUnidadeQuantidades.METRO, this.tipoFibra);
    }
    
    protected defineAtivos(): void {
        super.defineAtivos();

        // this.salasDeTelecom.forEach(sala => sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV));

        if (this.equipamentosAtivos.get(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO) != undefined) {
            this.equipamentosAtivos.delete(Tipos.TipoEquipamentoRack.TERMINADOR_OPTICO);
        }

        if (this.diciplinas.has(Tipos.TipoPontoTelecom.CFTV)) {
            let quantidadeFibrasCFTV = 0;

            this?.salasDeTelecom?.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 2;
            });

            this?.salasDeEquipamento?.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 1;
            });

            this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.SVR_24, new EquipamentoRack(
                Tipos.TipoEquipamentoRack.SVR_24,
                Math.ceil(quantidadeFibrasCFTV / 24),
                2
            ))
        }

        this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.DIO_24_4, new EquipamentoRack(
            Tipos.TipoEquipamentoRack.DIO_24, 
            Math.ceil(this.numeroFibras / 24), 
            1,
        ));

        let tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(this.tipoFibra, false);   

        this.defineAcopladores(tipoAcoplador, this.numeroFibras);
        
        this.equipamentosAtivos.set(Tipos.TipoEquipamentoRack.DIO_24_4, new EquipamentoRack(
            Tipos.TipoEquipamentoRack.DIO_24_4, 
            // mais 1 para receber as fibras da entrada de facilidade separado.
            Math.ceil(this.numeroFibras / 24) + 1, 
            1,
        ));

        if (this.fibrasOpticasRecebidas != undefined) {
            tipoAcoplador = Tipos.TipoAcopladorPigtailCordao.getTipo(
                this.fibrasOpticasRecebidas.tipo, 
                false
            );

            this.defineAcopladores(tipoAcoplador, this.fibrasOpticasRecebidas.quantidade);
        }
    }

    protected defineFibrasOpticas(
        quantidadeFibrasRecebidas: number = 12,
        tipoFibraRecebida: Tipos.TipoFibraOptica = Tipos.TipoFibraOptica.FOSM_9_125
    ): void {
        let tipoFibra = this.fibraBackbone.tipo;

        this.salasDeTelecom.forEach(sala => {
            sala.fibrasOpticasRecebidas = new Componente<Tipos.TipoFibraOptica>(
                sala.numeroFibras, 
                Tipos.TipoUnidadeQuantidades.UNIDADE, 
                tipoFibra
            );

            sala.save();
        });

        this.salasDeEquipamento.forEach(sala => {
            sala.fibrasOpticasRecebidas = new Componente<Tipos.TipoFibraOptica>(
                sala.numeroFibras, 
                Tipos.TipoUnidadeQuantidades.UNIDADE, 
                tipoFibra
            );

            sala.save();
        });

        this.fibrasOpticasRecebidas = new Componente<Tipos.TipoFibraOptica>(
            quantidadeFibrasRecebidas,
            Tipos.TipoUnidadeQuantidades.UNIDADE,
            tipoFibraRecebida,   
        )
    }
}