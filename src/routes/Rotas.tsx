import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaInicial from '../pages/TelaInicial.tsx';
import BuscaDoador from '../pages/BuscaDoador.tsx';
import CadastroDoador from '../pages/CadastroDoador.tsx';
import DoadorDoacao from '../pages/DoadorDoacao.tsx';
import Doacoes from '../pages/Doacoes.tsx';

function Rotas() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/BuscaDoador" element={<BuscaDoador />} />
          <Route path="/CadastroDoador" element={<CadastroDoador />} />
          <Route path="/BuscaDoador/DoadorDoacao" element={<DoadorDoacao />} />
          <Route path="/Doacoes" element={<Doacoes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Rotas;