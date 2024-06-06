import React from 'react';
import { createRoot } from 'react-dom/client';
import Rotas from './routes/Rotas.tsx';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
      <Rotas />
  </React.StrictMode>,
);