// src/components/App.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from './ui/input';

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [numPavimentos, setNumPavimentos] = useState(0);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNumPavimentosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumPavimentos(parseInt(e.target.value, 10));
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
    <div className="bg-slate-100 p-2 rounded-[10px] mt-4">
      <Label className="p-2 text-lg">Quantos backbone secundários haverá?</Label>
      <Input className="max-w-sm m-2" type="number" />
    </div>
  );

  const renderNoSecondaryBackbone = () => (
    <div className="bg-slate-100 p-2 rounded-[10px] mt-4">
      <Label className="p-2 text-lg">Qual a medida básica de um lance de cabo?</Label>
      <Input className="max-w-sm m-2" type="number" />
      <Label className="p-2 text-lg">Qual o número de pavimentos do prédio?</Label>
      <Input
        min={1}
        max={30}
        step={1}
        className="max-w-sm m-2"
        type="number"
        value={numPavimentos}
        onChange={handleNumPavimentosChange}
      />
      {Array.from({ length: numPavimentos }, (_, i) => (
        <div key={i} className="bg-slate-100 p-2 rounded-[10px] mt-4">
          <div className="bg-slate-200 p-2 rounded-[10px]">
            <Label className="p-2 text-lg">Pavimento {i + 1}</Label>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="container w-2/3 mx-auto h-screen flex flex-col">
      <header className="p-4 mb-4">
        <h1 className="text-3xl font-bold">Quantificação de backbone óptico</h1>
      </header>
      <div className="bg-slate-100 p-2 rounded-[10px]">
        {renderRadioGroup()}
      </div>
      {selectedOption === 'opcao-sim' && renderSecondaryBackbone()}
      {selectedOption === 'opcao-nao' && renderNoSecondaryBackbone()}
      <Button disabled={true} className="mt-4" type="button" variant="default">Exportar para planilha</Button>
    </main>
  );
};

export default Home;