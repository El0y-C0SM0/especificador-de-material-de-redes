import { Componente, Equipamento, Rack } from "./componente";
import * as Tipos from './tipos';
import { DistanciaInvalidaError, } from "./excecoes";

export class AreaDeTrabalho {
    tomadasFemeas?: Componente<Tipos.TipoConector> | null;
    pontosTelecom?: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>;
    patchCords?: Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>;
    micelaneas?: Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>;

    constructor(pontosTelecom: Map<Tipos.TipoPontoTelecom, Componente<Tipos.TipoPontoTelecom>>) {
        this.pontosTelecom = pontosTelecom;
        this.patchCords = new Map<Tipos.TipoCaboUTP, Componente<Tipos.TipoCaboUTP>>();

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

// TODO passar essa classe para SET e fazer SEQ herdar.
abstract class UnidadeDeRede {
    rackAberto?: boolean;
    // * Duplo nos TO simples no DIO
    pigtails?: Componente<Tipos.TipoPigtailCordao>;
    cordoes?: Map<Tipos.TipoPigtailCordao, Componente<Tipos.TipoPigtailCordao>>;
    acopladores?: Map<Tipos.TipoAcoplador, Componente<Tipos.TipoAcoplador>>; 
    equipamentosAtivos?: Map<Tipos.TipoEquipamento, Equipamento>;
    micelaneas?: Map<Tipos.TipoMicelanea, Componente<Tipos.TipoMicelanea>>;
    // * É tanto as fibras que redebem da SEQ quanto do provedor.
    fibrasOpticasRecebidas?: Componente<Tipos.TipoFibraOptica>; 

    constructor(rackAberto: boolean = false) {
        this.rackAberto = rackAberto;
    }

    get jumperCables(): Componente<Tipos.TipoCaboUTP> {
        let quantidadeSwitches = this.equipamentosAtivos.get(Tipos.TipoEquipamento.SWITCH_24)?.quantidade;

        if (quantidadeSwitches == undefined) return undefined;

        let quantidade = this.racks.reduce((acc, rack) => acc + rack.jumperCables.quantidade, 0);


        return new Componente<Tipos.TipoCaboUTP>(
            quantidade,
            Tipos.TipoUnidadeQuantidades.UNIDADE,
            Tipos.TipoCaboUTP.CINZA_CAT7
        );
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
            let selecionados: Map<Tipos.TipoEquipamento, Equipamento>;

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

    protected abstract defineAtivos() : void;

    abstract get numeroFibras() : number;
    
    abstract get diciplinas() : Set<Tipos.TipoPontoTelecom>;
}

export class SalaDeTelecom extends UnidadeDeRede {
    areaDeTrabalho?: AreaDeTrabalho;
    comprimentoMalhaHorizontal?: number;
    andarPrincipal?: boolean;
    numeroPiso?: number;

    constructor(areaDeTrabalho: AreaDeTrabalho, comprimentoMalhaHorizontal: number, numeroPiso: number, rackAberto: boolean = false) {
        super(rackAberto);

        this.areaDeTrabalho = areaDeTrabalho;

        // fazer definição de passivos de rede dentro da classe rack.
        this.equipamentosAtivos.set(Tipos.TipoEquipamento.PATCH_PANEL_24, new Equipamento(
            Tipos.TipoEquipamento.PATCH_PANEL_24, 
            this.equipamentos.get(Tipos.TipoEquipamento.SWITCH_24).quantidade, 
            1
        ));

        if (comprimentoMalhaHorizontal > 90) {
            throw new DistanciaInvalidaError(
                "Distancia dos pontos de telecom até a sala de telecom não deve exeder 100 metros"
            );
        }
            
        this.comprimentoMalhaHorizontal = comprimentoMalhaHorizontal;
        this.numeroPiso = numeroPiso;
        // this.cordoes = []; // TODO 1 para cada ativo ligado ao DIO ou TO se for duplo.
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

            // ? haverá um switch para cada par de fibras?

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
        let diciplinas: Set<Tipos.TipoPontoTelecom>;

        this.areaDeTrabalho.pontosTelecom.forEach(ponto => diciplinas.add(ponto.tipo));

        return diciplinas;
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
}

export class SalaDeEquipamentos extends UnidadeDeRede {
    salasDeTelecom?: SalaDeTelecom[];
    salasDeEquipamentos?: SalaDeEquipamentos[];
    peDireitoAndares?: number;
    // distancia que essa seq está da principal.
    distanciaSEQ?: number;

    constructor(distanciaSEQ: number, salasDeTelecom: SalaDeTelecom[] = [], salasDeEquipamentos: SalaDeEquipamentos[] = [], rackAberto: boolean = false) {
        super(rackAberto);
        this.salasDeTelecom = salasDeTelecom;
        this.salasDeEquipamentos = salasDeEquipamentos;
        this.distanciaSEQ = distanciaSEQ;

        if (this.salasDeEquipamentos.length > 0) {
            this.fibrasOpticasRecebidas = new Componente<Tipos.TipoFibraOptica>(
                this.numeroFibras,
                Tipos.TipoUnidadeQuantidades.UNIDADE,
                Tipos.TipoFibraOptica.FOSM_9_125
            );
        }

        this.defineFibrasOpticas();

        this.defineAtivos();
    }

    get tipoFibra(): Tipos.TipoFibraOptica {
        let maiorFibra = 0;

        if(this.salasDeTelecom.length != 0) {
            let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
                if (a.andarPrincipal) return -1;
                return a.numeroPiso - b.numeroPiso;
            });

            maiorFibra = Math.max(...sortedSalasDeTelecom.map(sala => {
                return Math.abs(sortedSalasDeTelecom[0].numeroPiso - sala.numeroPiso + 1) * this.peDireitoAndares; 
            }));
        } else if (this.salasDeEquipamentos.length != 0) {
            let sortedSalasDeEquipamentos = this.salasDeEquipamentos.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);

            maiorFibra = Math.max(...sortedSalasDeEquipamentos.map(sala => sala.distanciaSEQ));
        }

        return Tipos.TipoFibraOptica.getTipoFibra(maiorFibra);
    }

    get diciplinas(): Set<Tipos.TipoPontoTelecom> {
        let diciplinas: Set<Tipos.TipoPontoTelecom>;

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

        return numeroFibras;
    }

    get fibraBackbone(): Componente<Tipos.TipoFibraOptica> {
        let distancia = 0;
        
        let sortedSalasDeTelecom = this.salasDeTelecom.slice().sort((a, b) => {
            if (a.andarPrincipal) return -1;
            return a.numeroPiso - b.numeroPiso;
        });

        sortedSalasDeTelecom.forEach(sala => {
            distancia += Math.abs(sortedSalasDeTelecom[0].numeroPiso - sala.numeroPiso + 1) * this.peDireitoAndares; 
        });

        let sortedSalasDeEquipamentos = this.salasDeEquipamentos.slice().sort((a, b) => a.distanciaSEQ - b.distanciaSEQ);

        sortedSalasDeEquipamentos.forEach(sala => distancia += sala.distanciaSEQ);

        return new Componente<Tipos.TipoFibraOptica>(distancia, Tipos.TipoUnidadeQuantidades.METRO, this.tipoFibra);
    }

    defineAtivos(): void {
        this.salasDeTelecom.forEach(sala => sala.diciplinas.has(Tipos.TipoPontoTelecom.CFTV));

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


            // ? Como que a SEQ lida com várias fibras de CFTV? Vai precisar de um conversor de fibra para UTP para cada para tx/rx de fibra e conectar no DVR?

            this.equipamentosAtivos.set(Tipos.TipoEquipamento.DVR_24, new Equipamento(
                Tipos.TipoEquipamento.DVR_24,
                Math.ceil(quantidadeFibrasCFTV / 24),
                1
            ))
        }
        
        // ? O SEQ principal vai precisar de switch

        this.equipamentosAtivos.set(Tipos.TipoEquipamento.DIO_24_4, new Equipamento(
            Tipos.TipoEquipamento.DIO_24_4, 
            Math.ceil((this.salasDeEquipamentos.length + this.salasDeTelecom.length) / 4), 
            1,
        ));

        // TODO fazer quantificação de pigtails, cordoes e conectores.

        // ? Um DIO suporta receber quantos backbone de fibra, talvez só usar DIOs maiores.
        this.equipamentosAtivos.set(Tipos.TipoEquipamento.DIO_24_4, new Equipamento(
            Tipos.TipoEquipamento.DIO_24_4, 
            Math.ceil(this.numeroFibras / 24), 
            1,
        ));
    }

    defineFibrasOpticas(): void {
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
    }
}