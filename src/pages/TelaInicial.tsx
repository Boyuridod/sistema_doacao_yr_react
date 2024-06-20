import React from 'react';
import { Link } from 'react-router-dom';
import "../global.d.ts";
import estilo from "../styles/TelaInicial.module.css";

function TelaInicial() {
  return (
    <body className={estilo.body}>
      <div className={estilo.container}>
        <h1 className={estilo.h1}>Tela Inicial</h1>
        <nav className={estilo.nav}>
          <Link className={estilo.link} to="/CadastroDoador">Cadastrar Doador</Link>
          <Link className={estilo.link} to="/BuscaDoador">Buscar Doador</Link>
          <Link className={estilo.link} to="/Doacoes">Ver Doações</Link>
        </nav>
      </div>
    </body>
  );
}

export default TelaInicial;