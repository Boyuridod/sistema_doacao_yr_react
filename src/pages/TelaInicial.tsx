// TODO resolver problemas de rsponsividade

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CadastroDoador from './CadastroDoador.tsx';
import BuscaDoador from './BuscaDoador.tsx';

function TelaInicial() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/CadastroDoador' element={<CadastroDoador/>} />
        <Route path='/BuscaDoador' element={<BuscaDoador/>} />
      </Routes>
      
      <h1>Tela Inicial</h1>
      <nav>
        <Link to="/CadastroDoador">Cadastrar doador</Link>
        <br />
        <Link to="/BuscaDoador">Buscar Doador</Link>
      </nav>
    </BrowserRouter>
  );
}

export default TelaInicial;