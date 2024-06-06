// TODO resolver problemas de rsponsividade

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CadastroDoador from './CadastroDoador.tsx';
import BuscaDoador from './BuscaDoador.tsx';

function TelaInicial() {
  return (
    <div>
      <h1>Tela Inicial</h1>
      <nav>
        <Link to="/CadastroDoador">Cadastrar doador</Link>
        <br />
        <Link to="/BuscaDoador">Buscar Doador</Link>
      </nav>
    </div>
  );
}

export default TelaInicial;