// src/main.tsx
import './index.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
