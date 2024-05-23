import React from 'react';
import { createRoot } from 'react-dom/client';
import TelaInicial from './pages/TelaInicial.tsx';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <TelaInicial/>
  </React.StrictMode>,
);