// src/components/App.tsx
import React from 'react';
import { Button } from './ui/button';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo à Tela Inicial</h1>
      <p>Essa é a página principal do seu aplicativo.</p>
      <Button type="submit" variant="default">Teste</Button>
    </div>
  );
};

export default Home;
