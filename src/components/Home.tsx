// src/components/Home.tsx
import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from './ui/input';
import { Checkbox } from "@/components/ui/checkbox"
import { Table,
         TableHeader,
         TableRow,
         TableHead,
         TableBody,
         TableCell } from "@/components/ui/table";
import { Select } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import * as tps from '../models/tipos';
import { Componente } from '@/models/componente';
import { UndoIcon } from 'lucide-react';
import { AreaDeTrabalho, SalaDeEquipamentos, SalaDeTelecom } from '@/models/salas';


const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [numPavimentos, setNumPavimentos] = useState(0);
  const [numFibras, setNumFibras] = useState(0);
  const [tipoFibra, setTipoFibra] = useState<tps.TipoFibraOptica>(tps.TipoFibraOptica.FOSM_9_125);
  const [pavimentoSEQ, setPavimentoSEQ] = useState<[]>([]);
  const [alturaPavimentos, setAlturasPavimentos] = useState<{ [key: number]: number }>({});
  const [numBackbones, setNumBackbones] = useState(0);
  const [backbonePavimentos, setBackbonePavimentos] = useState<{ [key: number]: number }>({});
  const [pontosTelecom, setPontosTelecom] = useState<{ [key: string]: Map<tps.TipoPontoTelecom, Componente<tps.TipoPontoTelecom>> }>({});
  const [areasDeTrabalho, setAreasDeTrabalho] = useState<{ [key: string]: AreaDeTrabalho}>({});
  const [salasDeTelecom, setSalasDeTelecom] = useState<{ [key: string]: SalaDeTelecom}>({});
  const [seqPrimaria, setSEQPrimaria] = useState<SalaDeEquipamentos>();
  const [racksAbertos, setRackAberto] = useState<{ [key: string]: boolean}>({});
  const [malhasHorizontais, setMalhasHorizontais] = useState<{ [key: string]: number}>({});

  const optionsFibra = [
    { value: tps.TipoFibraOptica.FOMMIG_50_125, label: tps.TipoFibraOptica.FOMMIG_50_125 },
    { value: tps.TipoFibraOptica.FOSM_9_125, label: tps.TipoFibraOptica.FOSM_9_125 },
  ];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNumPavimentosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumPavimentos(parseInt(e.target.value, 10));
  };

  const handleNumBackbonesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumBackbones(parseInt(e.target.value, 10));
  };
  
  const handleBackbonePavimentosChange = (backboneIndex: number, pavimentos: number) => {
    setBackbonePavimentos((prevPavimentos) => ({ ...prevPavimentos, [backboneIndex]: pavimentos }));
  };
  
  const handleMalhasHorizontaisChange = (backboneIndex: number = 0, pavimentoIndex: number, comprimento: number) => {
    setMalhasHorizontais((prevMalhasHorizontais) => ({
      ...prevMalhasHorizontais,
      [`${backboneIndex},${pavimentoIndex}`]: comprimento,
    }));
  };
  
  const handlePontoRedeChange = (backboneIndex: number = 0, pavimentoIndex: number, quantidade: number, tipo: tps.TipoPontoTelecom) => {
    const componente = new Componente<tps.TipoPontoTelecom>(quantidade, tps.TipoUnidadeQuantidades.UNIDADE, tipo);

    let pavimento = pontosTelecom[`${backboneIndex},${pavimentoIndex}`];

    if (pavimento === undefined) 
      pavimento = new  Map<tps.TipoPontoTelecom, Componente<tps.TipoPontoTelecom>>();

    pavimento.set(tipo, componente);
    
    setPontosTelecom((prevPavimentos) => ({
      ...prevPavimentos,
      [`${backboneIndex},${pavimentoIndex}`]: pavimento, 
    }));
  };

  const handleRackAbertoClick = (backboneIndex: number = 0, pavimentoIndex: number) => {
    let value = true;

    if (racksAbertos[`${backboneIndex},${pavimentoIndex}`] !== undefined) 
      value = !racksAbertos[`${backboneIndex},${pavimentoIndex}`];

    setRackAberto((prevRacks) => ({
      ...prevRacks,
      [`${backboneIndex},${pavimentoIndex}`]: value,
    }));    
  }

  const saveAreaDeTrabalho = (backboneIndex: number = 0, pavimentoIndex: number) => {
    let pavimento = pontosTelecom[`${backboneIndex},${pavimentoIndex}`];

    if (pavimento !== undefined) {
      const novaAreaDeTrabalho = new AreaDeTrabalho(pavimento);

      setAreasDeTrabalho((preAreaDeTrabalho) => ({
        ...preAreaDeTrabalho,
        [`${backboneIndex},${pavimentoIndex}`]: novaAreaDeTrabalho,
      }));

      console.log(novaAreaDeTrabalho.numeroConectores);
    }
  }

  const save = () => {

    let salasTelecom: { [key: string]: SalaDeTelecom} = {};
    let iSeqPrimaria = 0;

    if (selectedOption === 'opcao-nao') {
      
      for (let i = 0; i < numPavimentos; i++) {
        if (pavimentoSEQ[0] === i) {
          iSeqPrimaria = i;
          continue;
        }

        salasTelecom[`0,${i}`] = new SalaDeTelecom(
          areasDeTrabalho[`0,${i}`],
          malhasHorizontais[`0,${i}`],
          i,
          racksAbertos[`0,${i}`]
        );
      }

      console.log(iSeqPrimaria);
      setSEQPrimaria(
        new SalaDeEquipamentos(
          areasDeTrabalho[`0,${iSeqPrimaria}`],
          malhasHorizontais[`0,${iSeqPrimaria}`],
          iSeqPrimaria,
          alturaPavimentos[0],
          Object.values(salasDeTelecom),
          undefined,
          undefined,
          racksAbertos[`0,${iSeqPrimaria}`],
          numFibras,
          tipoFibra,
        )
      )
    }

    setSalasDeTelecom((prevSalasTelecom) => ({
      ...prevSalasTelecom,
      ...salasTelecom
    }))

    parserDados();
    
  }

  class linhaTabela {
    nome: string;
    quantidade: number;
    unidade: string;

    constructor(nome: string, quantidade: number, unidade: string) {
      this.nome = nome;
      this.quantidade = quantidade;
      this.unidade = unidade
    }
  }

  const [dadosAreaDeTrabalhoTabela, setDadosAreaDeTrabalhoTabela] = useState<Map<string, linhaTabela>>();
  const [dadosSalasTelecomTabela, setDadosSalasTelecomTabela] = useState<Map<string, linhaTabela>>();
  const [dadosSalasEquipamentosTabela, setDadosSalasEquipamentosTabela] = useState<Map<string, linhaTabela>>();

  const parserDados = () => {
    let dadosAreaDeTrabalhoTabela = new Map<string, linhaTabela>();
    let tomadasLinha = new linhaTabela(
      `Tomada femea ${tps.TipoConector.CAT6}`, 
      0, 
      tps.TipoUnidadeQuantidades.UNIDADE
    );

    let areasTrabalho = Object.values(areasDeTrabalho);

    tomadasLinha.quantidade = areasTrabalho.reduce((soma, area) => soma + area.numeroConectores, 0);

    dadosAreaDeTrabalhoTabela.set(
      tomadasLinha.nome,
      tomadasLinha
    );

    areasTrabalho.forEach(area => {
      area.patchCords.forEach((value, key) => {
        let quantidade = dadosAreaDeTrabalhoTabela.get(key)?.quantidade ?? 0;

        dadosAreaDeTrabalhoTabela.set(
          key,
          new linhaTabela(value.tipo, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    setDadosAreaDeTrabalhoTabela(dadosAreaDeTrabalhoTabela);

    let dadosSalasTelecomTabela = new Map<string, linhaTabela>();
    let salasTelecom = Object.values(salasDeTelecom)
    // if (seqPrimaria != undefined)
    //   salasTelecom.push(seqPrimaria);

    salasTelecom.forEach(sala => {
      sala.pigtails.forEach((value, key) => {
        let quantidade = dadosSalasTelecomTabela.get(`Pigtail ${key}`)?.quantidade ?? 0;

        dadosSalasTelecomTabela.set(
          `Pigtail ${key}`,
          new linhaTabela(`Pigtail ${key}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    salasTelecom.forEach(sala => {
      sala.cordoes.forEach((value, key) => {
        let quantidade = dadosSalasTelecomTabela.get(`Cordão óptico ${key}`)?.quantidade ?? 0;

        dadosSalasTelecomTabela.set(
          `Cordão óptico  ${key}`,
          new linhaTabela(`Cordão óptico  ${key}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    salasTelecom.forEach(sala => {
      sala.acopladores.forEach((value, key) => {
        let quantidade = dadosSalasTelecomTabela.get(`Acoplador ${key}`)?.quantidade ?? 0;
        console.log(`Acoplador  ${key}`);
        dadosSalasTelecomTabela.set(
          `Acoplador  ${key}`,
          new linhaTabela(`Acoplador  ${value.tipo}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    dadosSalasTelecomTabela.set(
      `MH ${tps.TipoCaboUTP.BRANCO_CAT6}`,
      new linhaTabela(
        `MH ${tps.TipoCaboUTP.BRANCO_CAT6}`, 
        Math.ceil(salasTelecom.reduce((acc, sala) => acc + sala.comprimentoMalhaHorizontal, 0) / 305), 
        tps.TipoUnidadeQuantidades.CAIXA)
    );

    salasTelecom.forEach(sala => {
      sala.patchCables.forEach((value, key) => {
        let quantidade = dadosSalasTelecomTabela.get(`Patch Cable ${key}`)?.quantidade ?? 0;
        console.log(`Patch Cable ${key}`);
        dadosSalasTelecomTabela.set(
          `Patch Cable ${key}`,
          new linhaTabela(`Patch Cable ${value.tipo}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    dadosSalasTelecomTabela.set(
      `Jumper Cable ${tps.TipoCaboUTP.CINZA_CAT7}`,
      new linhaTabela(
        `Patch Cable ${tps.TipoCaboUTP.CINZA_CAT7}`,
        salasTelecom.reduce((acc, sala) => acc + (sala?.jumperCables?.quantidade ?? 0), 0), 
        tps.TipoUnidadeQuantidades.UNIDADE)
    );

    setDadosSalasTelecomTabela(dadosSalasTelecomTabela);

    let dadosSalasEquipamentosTabela = new Map<string, linhaTabela>();
    let salasEquipamentos = [];
    if (seqPrimaria != undefined)
      salasEquipamentos.push(seqPrimaria);
  
    salasEquipamentos.forEach(sala => {
      sala.acopladores.forEach((value, key) => {
        let quantidade = dadosSalasEquipamentosTabela.get(`Acoplador ${key}`)?.quantidade ?? 0;

        dadosSalasEquipamentosTabela.set(
          `Acoplador ${key}`,
          new linhaTabela(`Acoplador ${key}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });
    
    salasEquipamentos.forEach(sala => {
      sala.cordoes.forEach((value, key) => {
        let quantidade = dadosSalasEquipamentosTabela.get(`Cordão óptico ${key}`)?.quantidade ?? 0;

        dadosSalasEquipamentosTabela.set(
          `Cordão óptico ${key}`,
          new linhaTabela(`Cordão óptico ${key}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    salasEquipamentos.forEach(sala => {
      sala.pigtails.forEach((value, key) => {
        let quantidade = dadosSalasEquipamentosTabela.get(`Pigtail ${key}`)?.quantidade ?? 0;

        dadosSalasEquipamentosTabela.set(
          `Pigtail ${key}`,
          new linhaTabela(`Pigtail ${key}`, quantidade + value.quantidade, value.unidade)
        );
      })
    });

    salasEquipamentos.forEach(sala => {
      let fibraBackbone = sala.fibraBackbone;
      console.log(fibraBackbone.quantidade);
      let quantidade = dadosSalasEquipamentosTabela.get(`Cabo backbone ${fibraBackbone.tipo} - ${sala.numeroFibras} fibras`)?.quantidade ?? 0;

      dadosSalasEquipamentosTabela.set(
        `Cabo backbone ${fibraBackbone.tipo} - ${sala.numeroFibras}`,
        new linhaTabela(
          `Cabo backbone ${fibraBackbone.tipo} - ${sala.numeroFibras}`,
          quantidade + fibraBackbone.quantidade, fibraBackbone.unidade)
      );
    });

    setDadosSalasEquipamentosTabela(dadosSalasEquipamentosTabela);
  }

  const renderRadioGroup = () => (
    <div>
      <Label className="p-2 text-lg">Haverão salas de equipamentos secundárias?</Label>
      <RadioGroup className="p-2">
        <div className="flex items-center space-x-2 p-2">
          <RadioGroupItem
            value="opcao-nao"
            id="opcao-nao"
            checked={selectedOption === 'opcao-nao'}
            onClick={() => handleOptionClick('opcao-nao')}
          />
          <Label>Não terá sala de equipamentos secundária.</Label>
        </div>
        <div className="flex items-center space-x-2 p-2">
          <RadioGroupItem
            value="opcao-sim"
            id="opcao-sim"
            checked={selectedOption === 'opcao-sim'}
            onClick={() => handleOptionClick('opcao-sim')}
          />
          <Label>Terá sala de equipamentos secundária.</Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderSecondaryBackbone = () => (
    <div>
      <div className="bg-slate-100 p-2 rounded-[10px] mt-4">
        <div className="w-full px-2">
          <Label className="p-2 text-lg">Qual o número de salas de equipamentos secundárias? (backbones secundários)</Label>
          <Input
            min={1}
            max={10}
            className="w-full grow"
            type="number"
            value={numBackbones}
            onChange={handleNumBackbonesChange}
          />
          <Label className="p-2 text-lg block">Qual a sala de equipamentos primária?</Label>
          <Input
            min={1}
            max={numBackbones}
            defaultValue={1}
            step={1}
            className="w-full grow"
            type="number"
            onChange={e => {
              let num = parseInt(e.target.value);
              num = Math.max(num, 1);
              num = Math.min(num, numBackbones);
              e.currentTarget.value = num.toString();
              setNumBackbones(num);
            }}
          />
        </div>
      </div>
      {Array.from({ length: numBackbones }, (_, i) => (
        <div key={i} className="bg-slate-100 p-2 rounded-[10px] mt-4">
          <div className="bg-slate-100 p-2 rounded-[10px]">
            <div>
              <Label className="p-1 text-lg block">Sala de equipamentos {i + 1}</Label>
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-2">
                  <Label className="p-2 text-lg block">Qual a distância até a sala de equipamentos primária? (em metros)</Label>
                  <Input min={1} max={30_000} className="w-full grow" type="number" />
                </div>
                <div className="w-full px-2">
                  <Label className="p-2 text-lg block">Qual a altura de cada andar? (em metros)</Label>
                  <Input min={1} max={10} className="w-full grow" type="number"
                  onChange={e => {
                    console.log(e.target.value);
                    setAlturasPavimentos((prevAlturas) => ({
                      ...prevAlturas,
                      [i]: parseInt(e.target.value), 
                    }))
                  }}
                   />
                </div>
                <div className="w-full px-2 mt-2">
                  <Label className="p-2 text-lg block">Qual o número de pavimentos do backbone {i + 1}?</Label>
                  <Input
                    min={1}
                    max={30}
                    step={1}
                    className="w-full grow"
                    type="number"
                    value={backbonePavimentos[i] || 0}
                    onChange={(e) => handleBackbonePavimentosChange(i, parseInt(e.target.value, 10))}
                  />
                  <Label className="p-2 text-lg block">Em qual pavimento ficará a sala de Equipamentos {i + 1}?</Label>
                  <Input
                    min={1}
                    max={numPavimentos}
                    defaultValue={0}
                    step={1}
                    className="w-full grow"
                    type="number"
                    onChange={e => {
                      let num = parseInt(e.target.value);
                      num = Math.max(num, 1);
                      num = Math.min(num, numPavimentos);
                      e.currentTarget.value = num.toString();
                      console.log(num);
                      setPavimentoSEQ(prevPavimetosSEQ => ({
                        ...prevPavimetosSEQ,
                        num
                      }));
                    }}
                  />
                </div>
              </div>
              {Array.from({ length: backbonePavimentos[i] || 0 }, (_, j) => (
                <div key={j} className="bg-slate-100 p-2 rounded-[10px] mt-4">
                  <div className="bg-slate-200 p-2 rounded-[10px]">
                    <Label className="p-1 text-lg block">Pavimento {j + 1}</Label>
                  </div>
                  <div className="bg-slate-200 p-2 rounded-[10px]">
                    <div className="flex items-center space-x-2 p-1">
                      <Label className="m-1 mt-2">Rack aberto</Label>
                      <Checkbox
                        className="m-1 mt-3 mr-0"
                        id={`rack-aberto-${i}-${j}`}
                        name={`rack-aberto-${i}-${j}`}
                        onClick={() => handleRackAbertoClick(i, j)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 p-1">
                      <Label className="m-1 mt-2">Comprimento da malha horizontal:</Label>
                      <Input 
                        className="m-1"
                        type="number"
                        onChange={e => {
                          const value = parseInt(e.target.value);
                          handleMalhasHorizontaisChange(undefined, i, value);
                        }}
                      />
                    </div>
                    <div>
                      {i === 0 && j === 0 && (
                        <Label className="p-1 block">
                          Marque as disciplinas que estarão no andar e informe as respectivas quantidades de pontos de rede de cada uma.
                        </Label>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col space-y-2 p-2">
                        <Label className="m-1 mt-2">Dados</Label>
                        <Input
                          className="m-1"
                          type="number"
                          onChange={(e) => {
                            const quantidade = parseInt(e.target.value, 10);
                            const tipo = tps.TipoPontoTelecom.REDE;
                            handlePontoRedeChange(undefined, i, quantidade, tipo);
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-2 p-2">
                        <Label className="m-1">VoIP</Label>
                        <Input
                          className="m-1"
                          type="number"
                          onChange={(e) => {
                            const quantidade = parseInt(e.target.value, 10);
                            const tipo = tps.TipoPontoTelecom.VOIP;
                            handlePontoRedeChange(undefined, i, quantidade, tipo);
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-2 p-2">
                        <Label className="m-1">CFTV</Label>
                        <Input
                          className="m-1"
                          type="number"
                          onChange={(e) => {
                            const quantidade = parseInt(e.target.value, 10);
                            const tipo = tps.TipoPontoTelecom.CFTV;
                            handlePontoRedeChange(i, j, quantidade, tipo);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNoSecondaryBackbone = () => (
    <div className="bg-slate-100 p-2 rounded-[10px] mt-4">
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-2">
          <Label className="p-2 text-lg block">Qual a altura de cada andar? (em metros)</Label>
          <Input min={1} max={10} className="w-full grow" type="number" 
          onChange={e => {
            console.log(e.target.value);
            setAlturasPavimentos((prevAlturas) => ({
              ...prevAlturas,
              [0]: parseInt(e.target.value), 
            }))
          }}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <Label className="p-2 text-lg block">Qual o número de pavimentos do prédio?</Label>
          <Input
            min={1}
            max={30}
            step={1}
            className="w-full grow"
            type="number"
            value={numPavimentos}
            onChange={handleNumPavimentosChange}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <Label className="p-2 text-lg block">Em qual pavimento ficará a sala de Equipamentos?</Label>
          <Input
            min={1}
            max={numPavimentos}
            defaultValue={0}
            step={1}
            className="w-full grow"
            type="number"
            onChange={e => {
              let num = parseInt(e.target.value);
              num = Math.max(num, 1);
              num = Math.min(num, numPavimentos);
              e.currentTarget.value = num.toString();
              console.log(num);
              setPavimentoSEQ(prevPavimetosSEQ => ({
                ...prevPavimetosSEQ,
                num
              }));
            }}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <Label className="p-2 text-lg block">Quantas fibras são recebidas do provedor?</Label>
          <Input
            min={1}
            max={24}
            defaultValue={12}
            step={1}
            className="w-full grow"
            type="number"
            onChange={e => setNumFibras(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full px-2 mt-2">
          <Label className="p-2 text-lg block">Qual o tipo de fibra recebido do provedor?</Label>
          <Select
            className="w-full grow"
            defaultValue={tps.TipoFibraOptica.FOSM_9_125}
            onChange={(e) => {
              const tipo = tps.TipoFibraOptica.getValue(e.target.value);
              setTipoFibra(tps.TipoFibraOptica.FOMMIG_50_125);
            }}
          >
            {optionsFibra.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            ))}
          </Select>
        </div>
      </div>
      {Array.from({ length: numPavimentos }, (_, i) => (
        <div key={i} className="bg-slate-100 p-2 rounded-[10px] mt-4">
          <div>
            <Label className="p-1 text-lg block">Pavimento {i + 1}</Label>
          </div>
          <div className="bg-slate-200 p-2 rounded-[10px]">
            <div className="flex items-center space-x-2 p-1">
              <Label className="m-1 mt-2">Rack aberto</Label>
              <Checkbox
                className="m-1 mt-3 mr-0"
                id={`rack-aberto-${i}`}
                name={`rack-aberto-${i}`}
                onClick={() => handleRackAbertoClick(undefined, i)} 
              />
            </div>
            <div className="flex items-center space-x-2 p-1">
              <Label className="m-1 mt-2">Comprimento da malha horizontal:</Label>
              <Input 
                className="m-1"
                type="number"
                onChange={e => {
                  const value = parseInt(e.target.value);
                  handleMalhasHorizontaisChange(undefined, i, value);
                }}
              />
            </div>
            <div>
              {i === 0 && (
                <Label className="p-1 block">
                  Marque as disciplinas que estarão no andar e informe as respectivas quantidades de pontos de rede de cada uma.
                </Label>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col space-y-2 p-2">
                <Label className="m-1 mt-2">Dados</Label>
                <Input
                  className="m-1"
                  type="number"
                  onChange={(e) => {
                    const quantidade = parseInt(e.target.value, 10);
                    const tipo = tps.TipoPontoTelecom.REDE;
                    handlePontoRedeChange(undefined, i, quantidade, tipo);
                    saveAreaDeTrabalho(undefined, i);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2 p-2">
                <Label className="m-1">VoIP</Label>
                <Input
                  className="m-1"
                  type="number"
                  onChange={(e) => {
                    const quantidade = parseInt(e.target.value, 10);
                    const tipo = tps.TipoPontoTelecom.VOIP;
                    handlePontoRedeChange(undefined, i, quantidade, tipo);
                    saveAreaDeTrabalho(undefined, i);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2 p-2">
                <Label className="m-1">CFTV</Label>
                <Input
                  className="m-1"
                  type="number"
                  onChange={(e) => {
                    const quantidade = parseInt(e.target.value, 10);
                    const tipo = tps.TipoPontoTelecom.CFTV;
                    handlePontoRedeChange(undefined, i, quantidade, tipo);
                    saveAreaDeTrabalho(undefined, i);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTable = () => (
    <div>
      <h2 className="text-2xl font-bold m-4">Planilha Resultado</h2>
      <h3 className="text-xl font-bold m-4">Areas de trabalho</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...dadosAreaDeTrabalhoTabela?.values() ?? []].filter(value => value.quantidade > 0).map(value => (
          <TableRow key={value.nome}>
            <TableCell>{value.nome}</TableCell>
            <TableCell>{value.quantidade}</TableCell>
            <TableCell>{value.unidade}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      <h3 className="text-xl font-bold m-4">Salas Telecom</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...dadosSalasTelecomTabela?.values() ?? []].filter(value => value.quantidade > 0).map(value => (
          <TableRow key={value.nome}>
            <TableCell>{value.nome}</TableCell>
            <TableCell>{value.quantidade}</TableCell>
            <TableCell>{value.unidade}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      <h3 className="text-xl font-bold m-4">Salas de Equipamentos</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...dadosSalasEquipamentosTabela?.values() ?? []].filter(value => value.quantidade > 0).map(value => (
          <TableRow key={value.nome}>
            <TableCell>{value.nome}</TableCell>
            <TableCell>{value.quantidade}</TableCell>
            <TableCell>{value.unidade}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderButtonSave = () => (
    <div>
      <Button
      onClick={save}
      >Salvar</Button>
    </div>
  );

  return (
    <main className="container w-full mx-auto h-screen flex flex-col md:w-2/3">
      <header className="p-4 mb-4">
        <h1 className="text-3xl font-bold">Quantificação de backbone óptico</h1>
        <h2 className="text-2xl font-bold mt-4">Dados de entrada</h2>
      </header>
      <div className="bg-slate-100 p-2 rounded-[10px]">
        {renderRadioGroup()}
      </div>
      {selectedOption === 'opcao-sim' && renderSecondaryBackbone()}
      {selectedOption === 'opcao-nao' && renderNoSecondaryBackbone()}
      {renderButtonSave()}
      {renderTable()}
      <h2 className="text-2xl font-bold m-4">Contribuidores</h2>
      <div className="flex justify-between">
        <a href="https://github.com/MatheusViniciusV" target="_blank" rel="noopener noreferrer">
          <Button variant="link">@MatheusViniciusV</Button>
        </a>
        <a href="https://github.com/El0y-C0SM0" target="_blank" rel="noopener noreferrer">
          <Button variant="link">@El0y-C0SM0</Button>
        </a>
        <a href="https://github.com/VPom135" target="_blank" rel="noopener noreferrer">
          <Button variant="link">@VPom135</Button>
        </a>
      </div>
    </main>
  );
};

export default Home;