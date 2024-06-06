import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaInicial from '../pages/TelaInicial.tsx';
import BuscaDoador from '../pages/BuscaDoador.tsx';
import CadastroDoador from '../pages/CadastroDoador.tsx';

function Rotas() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/buscadoador" element={<BuscaDoador />} />
          <Route path="/cadastrodoador" element={<CadastroDoador />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Rotas;