import { Componente, Equipamento, Rack } from "./componente";
import * as Tipos from './tipos';
import { DistanciaInvalidaError, } from "./excecoes";

export class AreaDeTrabalho {
    tomadasFemeas?: Componente<Tipos.TipoConector> | null;
    patchCords: Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>;
    micelaneas: Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>;
    private _pontosTelecom: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>;

    constructor(pontosTelecom: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>) {
        this.pontosTelecom = pontosTelecom;
        this.patchCords = new Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>();        
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
            quantidadeTomadas += (ponto.tipo === Tipos.TipoPontoTelecom.REDE ? ponto.quantidade * 2 : ponto.quantidade);

            let tipoCabo = Tipos.TipoPontoTelecom.toTipoPatchCord(ponto.tipo);
        
            this.patchCords.set(tipoCabo, new Componente<Tipos.TipoCaboUTP>(
                ponto.quantidade, 
                Tipos.TipoUnidadeQuantidades.UNIDADE, 
                tipoCabo
            ));
        });

        this.tomadasFemeas = new Componente<Tipos.TipoConector>(quantidadeTomadas, Tipos.TipoUnidadeQuantidades.UNIDADE, Tipos.TipoConector.CAT6);
        this.micelaneas.set(Tipos.TipoMicelanea.ETIQUETAS_IDENTIFICACAO, new Componente<Tipos.TipoMicelanea>(
            quantidadeTomadas + totalPontos, // tomadas + espelhos
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
    pigtails?: Componente<Tipos.TipoPigtailCordao>;
    cordoes?: Map<Tipos.TipoPigtailCordao, Componente<Tipos.TipoPigtailCordao>>;
    // ? É o mesmo que transcivers
    acopladores?: Map<Tipos.TipoAcoplador, Componente<Tipos.TipoAcoplador>>; 
    equipamentosAtivos: Map<Tipos.TipoEquipamento, Equipamento>;
    micelaneas?: Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>;
    // É tanto as fibras que redebem da SEQ primária quanto do provedor.
    fibrasOpticasRecebidas: Componente<Tipos.TipoFibraOptica>; 
    areaDeTrabalho: AreaDeTrabalho;
    comprimentoMalhaHorizontal: number;
    numeroPiso: number;

    constructor(
        areaDeTrabalho: AreaDeTrabalho, 
        comprimentoMalhaHorizontal: number, 
        numeroPiso: number, 
        rackAberto: boolean = false
    ) {
        this.rackAberto = rackAberto;
        this.areaDeTrabalho = areaDeTrabalho;

        if (comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError(
                "Distancia dos pontos de telecom até a sala de telecom não deve exeder 100 metros"
            );
        }
            
        this.comprimentoMalhaHorizontal = comprimentoMalhaHorizontal;
        this.numeroPiso = numeroPiso;
        // this.cordoes = []; // TODO 1 para cada ativo ligado ao DIO ou TO se for duplo.

        this.defineAtivos();
    }

    save(): void {
        if (this.comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError(
                "Distancia dos pontos de telecom até a sala de telecom não deve exeder 100 metros"
            );
        }

        this.defineAtivos();
    }

    defineAtivos(): void {
        this.equipamentosAtivos.set(Tipos.TipoEquipamento.SWITCH_24, new Equipamento(
            Tipos.TipoEquipamento.SWITCH_24, 
            Math.ceil(this.areaDeTrabalho.numeroConectores / 24),
            1
        ));


        if(this.numeroFibras <= 8) {
            this.equipamentos.set(Tipos.TipoEquipamento.TERMINADOR_OPTICO, new Equipamento(
                Tipos.TipoEquipamento.TERMINADOR_OPTICO, 
                1, 
                0, 
            ));
        } else {
            this.equipamentos.set(Tipos.TipoEquipamento.DIO_24_4, new Equipamento(
                Tipos.TipoEquipamento.DIO_24_4, 
                Math.ceil(this.numeroFibras / 24), 
                1,
            ));

            // TODO fazer quantificação de pigtails, cordoes e conectores.
        }
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
        let quantidadeSwitches = this.equipamentosAtivos.get(Tipos.TipoEquipamento.SWITCH_24)?.quantidade;

        if (quantidadeSwitches == undefined) return undefined;

        let quantidade = this.racks.reduce((acc, rack) => acc + (rack?.jumperCables?.quantidade ?? 0), 0);


        return new Componente<Tipos.TipoCaboUTP>(
            quantidade,
            Tipos.TipoUnidadeQuantidades.UNIDADE,
            Tipos.TipoCaboUTP.CINZA_CAT7
        );
    }

    get equipamentos() : Map<Tipos.TipoEquipamento, Equipamento> {
        let equipamentos = new Map<Tipos.TipoEquipamento, Equipamento>();

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
            let selecionados = new Map<Tipos.TipoEquipamento, Equipamento>();

            this.equipamentosAtivos.forEach(equipamento => {
                if(cont - equipamento.quantidade < 0) {
                    selecionados.set(
                        equipamento.tipo,
                        new Equipamento(
                            equipamento.tipo,
                            cont,
                            equipamento.alturaUnitaria
                        )
                    );

                    racks.push(new Rack(selecionados));
                    selecionados.clear();

                    selecionados.set(
                        equipamento.tipo,
                        new Equipamento(
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
    salasDeEquipamentos: SalaDeEquipamentos[];
    peDireitoAndares: number;
    // distancia que essa seq está da principal.
    distanciaSEQ: number;

    constructor(
        areaDeTrabalho: AreaDeTrabalho, 
        comprimentoMalhaHorizontal: number, 
        numeroPiso: number, 
        salasDeTelecom: SalaDeTelecom[],
        salasDeEquipamentos: SalaDeEquipamentos[] = [], 
        distanciaSEQ: number = 0, 
        rackAberto: boolean = false,
        quantidadeFibrasRecebidas: number = 12,
        tipoFibrasRecebidas: Tipos.TipoFibraOptica = Tipos.TipoFibraOptica.FOSM_9_125
    ) {
        super(areaDeTrabalho, comprimentoMalhaHorizontal, numeroPiso, rackAberto=rackAberto);
        this.salasDeTelecom = salasDeTelecom;
        this.salasDeEquipamentos = salasDeEquipamentos;
        this.distanciaSEQ = distanciaSEQ;

        this.defineFibrasOpticas(quantidadeFibrasRecebidas, tipoFibrasRecebidas);

        this.defineAtivos();
    }

    save(): void {
        super.save();

        this.defineFibrasOpticas()
        this.defineAtivos();
    }

    get tipoFibra(): Tipos.TipoFibraOptica {
        let maiorFibra = 0;

        if(this.salasDeEquipamentos.length == 0) {
            let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
                return a.numeroPiso - b.numeroPiso;
            });

            maiorFibra = Math.max(...sortedSalasDeTelecom.map(sala => {
                return Math.abs(this.numeroPiso - sala.numeroPiso + 1) * this.peDireitoAndares; 
            }));
        } else if (this.salasDeEquipamentos.length != 0) {
            let sortedSalasDeEquipamentos = this.salasDeEquipamentos.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);

            maiorFibra = Math.max(...sortedSalasDeEquipamentos.map(sala => sala.distanciaSEQ));
        }

        return Tipos.TipoFibraOptica.getTipoFibra(maiorFibra);
    }

    get diciplinas(): Set<Tipos.TipoPontoTelecom> {
        let diciplinas = super.diciplinas;

        this.salasDeTelecom.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });

        this.salasDeEquipamentos.forEach(sala => {
            sala.diciplinas.forEach(diciplina => diciplinas.add(diciplina));
        });

        return diciplinas;
    }

    get numeroFibras() : number {
        let numeroFibras = 0;

        this.salasDeTelecom.forEach(sala => numeroFibras += sala.numeroFibras);
        this.salasDeEquipamentos.forEach(sala => numeroFibras += sala.numeroFibras);
        numeroFibras += super.numeroFibras;

        return numeroFibras;
    }

    get fibraBackbone(): Componente<Tipos.TipoFibraOptica> {
        let distancia = 0;
        
        let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
            return a.numeroPiso - b.numeroPiso;
        });

        sortedSalasDeTelecom.forEach(sala => {
            distancia += Math.abs(this.numeroPiso - sala.numeroPiso + 1) * this.peDireitoAndares; 
        });

        let sortedSalasDeEquipamentos = this.salasDeEquipamentos.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);

        sortedSalasDeEquipamentos.forEach(sala => distancia += sala.distanciaSEQ);

        return new Componente<Tipos.TipoFibraOptica>(distancia, Tipos.TipoUnidadeQuantidades.METRO, this.tipoFibra);
    }
    // ethernet pode ser sinonimo de rede no contexto de telecom?
    defineAtivos(): void {
        super.defineAtivos();

        this.salasDeTelecom.forEach(sala => sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV));

        if (this.equipamentos.get(Tipos.TipoEquipamento.TERMINADOR_OPTICO) != undefined) {
            this.equipamentos.delete(Tipos.TipoEquipamento.TERMINADOR_OPTICO);
        }

        if (this.diciplinas.has(Tipos.TipoPontoTelecom.CFTV)) {
            let quantidadeFibrasCFTV = 0;

            this.salasDeTelecom.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 2;
            });

            this.salasDeEquipamentos.forEach(sala => {
                if (sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV))
                    quantidadeFibrasCFTV += 1;
            });

            this.equipamentosAtivos.set(Tipos.TipoEquipamento.SVR_24, new Equipamento(
                Tipos.TipoEquipamento.SVR_24,
                Math.ceil(quantidadeFibrasCFTV / 24),
                2
            ))
        }

        this.equipamentosAtivos.set(Tipos.TipoEquipamento.DIO_24_4, new Equipamento(
            Tipos.TipoEquipamento.DIO_24_4, 
            Math.ceil((this.salasDeEquipamentos.length + this.salasDeTelecom.length) / 4), 
            1,
        ));

        // TODO fazer quantificação de pigtails, cordoes e conectores.

        this.equipamentosAtivos.set(Tipos.TipoEquipamento.DIO_24_4, new Equipamento(
            Tipos.TipoEquipamento.DIO_24_4, 
            // mais 1 para receber as fibras da entrada de facilidade separado.
            Math.ceil(this.numeroFibras / 24) + 1, 
            1,
        ));
    }

    defineFibrasOpticas(
        quantidadeFibrasRecebidas: number = 12,
        tipoFibraRecebida: Tipos.TipoFibraOptica = Tipos.TipoFibraOptica.FOSM_9_125
    ): void {
        this.salasDeTelecom.forEach(sala => sala.fibrasOpticasRecebidas =
            new Componente<Tipos.TipoFibraOptica>(
                sala.numeroFibras, 
                Tipos.TipoUnidadeQuantidades.UNIDADE, 
                this.fibraBackbone.tipo
        ));

        this.salasDeEquipamentos.forEach(sala => sala.fibrasOpticasRecebidas =
            new Componente<Tipos.TipoFibraOptica>(
                sala.numeroFibras, 
                Tipos.TipoUnidadeQuantidades.UNIDADE, 
                this.fibraBackbone.tipo
        ));

        this.fibrasOpticasRecebidas = new Componente<Tipos.TipoFibraOptica>(
            quantidadeFibrasRecebidas,
            Tipos.TipoUnidadeQuantidades.UNIDADE,
            tipoFibraRecebida,   
        )
    }
}