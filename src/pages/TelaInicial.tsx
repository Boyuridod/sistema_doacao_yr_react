// TODO resolver problemas de rsponsividade

import React from 'react';
import { Link } from 'react-router-dom';
// import "../styles/TelaInicial.css";

function TelaInicial() {
  return (
    <body>
    <div className='container'>
      <h1>Tela Inicial</h1>
      <nav>
        <Link className="link" to="/CadastroDoador">Cadastrar Doador</Link>
        <Link className="link" to="/BuscaDoador">Buscar Doador</Link>
        <Link className="link" to="/Doacoes">Ver Doações</Link>
      </nav>
    </div>
    
      
    </body>
  );
}

export default TelaInicial;