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
import { Button } from "@/components/ui/button";


const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [numPavimentos, setNumPavimentos] = useState(0);
  const [numBackbones, setNumBackbones] = useState(0);
  const [backbonePavimentos, setBackbonePavimentos] = useState<{ [key: number]: number }>({});

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

  const renderRadioGroup = () => (
    <div>
      <Label className="p-2 text-lg">Haverá backbone secundário?</Label>
      <RadioGroup className="p-2">
        <div className="flex items-center space-x-2 p-2">
          <RadioGroupItem
            value="opcao-nao"
            id="opcao-nao"
            checked={selectedOption === 'opcao-nao'}
            onClick={() => handleOptionClick('opcao-nao')}
          />
          <Label>Não terá backbone secundário.</Label>
        </div>
        <div className="flex items-center space-x-2 p-2">
          <RadioGroupItem
            value="opcao-sim"
            id="opcao-sim"
            checked={selectedOption === 'opcao-sim'}
            onClick={() => handleOptionClick('opcao-sim')}
          />
          <Label>Terá backbone secundário.</Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderSecondaryBackbone = () => (
    <div>
      <div className="bg-slate-100 p-2 rounded-[10px] mt-4">
        <div className="w-full px-2">
          <Label className="p-2 text-lg">Qual o número de backbones secundários?</Label>
          <Input
            min={1}
            max={10}
            className="w-full grow"
            type="number"
            value={numBackbones}
            onChange={handleNumBackbonesChange}
          />
        </div>
      </div>
      {Array.from({ length: numBackbones }, (_, i) => (
        <div key={i} className="bg-slate-100 p-2 rounded-[10px] mt-4">
          <div className="bg-slate-100 p-2 rounded-[10px]">
            <div>
              <Label className="p-1 text-lg block">Backbone {i + 1}</Label>
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-2">
                  <Label className="p-2 text-lg block">Qual a distância até o backbone primário? (em metros)</Label>
                  <Input min={1} max={10} className="w-full grow" type="number" />
                </div>
                <div className="w-full px-2">
                  <Label className="p-2 text-lg block">Qual a altura de cada andar? (em metros)</Label>
                  <Input min={1} max={10} className="w-full grow" type="number" />
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
                </div>
              </div>
              {Array.from({ length: backbonePavimentos[i] || 0 }, (_, j) => (
                <div key={j} className="bg-slate-100 p-2 rounded-[10px] mt-4">
                  <div className="bg-slate-200 p-2 rounded-[10px]">
                    <div>
                      <Label className="p-1 text-lg block">Pavimento {j + 1}</Label>
                      {i === 0 && j === 0 && (
                        <Label className="p-1 block">
                          Marque as disciplinas que estarão no andar e informe as respectivas quantidades de pontos de rede de cada uma.
                        </Label>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col space-y-2 p-2">
                        <div className="flex items-center space-x-2 p-1">
                          <Checkbox
                            className="m-1 mt-3 mr-0"
                            id={`disciplina-1-${i}-${j}`}
                            name={`disciplina-1-${i}-${j}`}
                          />
                          <Label className="m-1 mt-2">Dados</Label>
                        </div>
                        <Input
                          className="m-1"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col space-y-2 p-2">
                        <div className="flex items-center space-x-2 p-1">
                          <Checkbox
                            className="m-1 mt-3 mr-0"
                            id={`disciplina-2-${i}-${j}`}
                            name={`disciplina-2-${i}-${j}`}
                          />
                          <Label className="m-1">VoIP</Label>
                        </div>
                        <Input
                          className="m-1"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col space-y-2 p-2">
                        <div className="flex items-center space-x-2 p-1">
                          <Checkbox
                            className="m-1 mt-3 mr-0"
                            id={`disciplina-3-${i}-${j}`}
                            name={`disciplina-3-${i}-${j}`}
                          />
                          <Label className="m-1">CFTV</Label>
                        </div>
                        <Input
                          className="m-1"
                          type="number"
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
          <Input min={1} max={10} className="w-full grow" type="number" />
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
      </div>
      {Array.from({ length: numPavimentos }, (_, i) => (
        <div key={i} className="bg-slate-100 p-2 rounded-[10px] mt-4">
          <div className="bg-slate-200 p-2 rounded-[10px]">
            <div>
              <Label className="p-1 text-lg block">Pavimento {i + 1}</Label>
              {i === 0 && (
                <Label className="p-1 block">
                  Marque as disciplinas que estarão no andar e informe as respectivas quantidades de pontos de rede de cada uma.
                </Label>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center space-x-2 p-1">
                  <Checkbox
                    className="m-1 mt-3 mr-0"
                    id={`disciplina-1-${i}`}
                    name={`disciplina-1-${i}`}
                  />
                  <Label className="m-1 mt-2">Dados</Label>
                </div>
                <Input
                  className="m-1"
                  type="number"
                />
              </div>
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center space-x-2 p-1">
                  <Checkbox
                    className="m-1 mt-3 mr-0"
                    id={`disciplina-2-${i}`}
                    name={`disciplina-2-${i}`}
                  />
                  <Label className="m-1">VoIP</Label>
                </div>
                <Input
                  className="m-1"
                  type="number"
                />
              </div>
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center space-x-2 p-1">
                  <Checkbox
                    className="m-1 mt-3 mr-0"
                    id={`disciplina-3-${i}`}
                    name={`disciplina-3-${i}`}
                  />
                  <Label className="m-1">CFTV</Label>
                </div>
                <Input
                  className="m-1"
                  type="number"
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>TesteNome</TableCell>
            <TableCell>10</TableCell>
            <TableCell>metros</TableCell>
          </TableRow>
        </TableBody>
      </Table>
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