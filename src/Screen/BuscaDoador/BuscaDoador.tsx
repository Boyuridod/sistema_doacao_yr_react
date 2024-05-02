import React from "react";
import "../../styles/BuscaDoador/BuscaDoador.css"

function BuscaDoador() {

    return (
        <body>
            <div className="CampoDePesquisa">
            <form className="formulario" action="">
                    <h1 className="titulo_formulario">Cadastro de doador</h1>
                    <label htmlFor="nome" className="labelFormulario">Nome:
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira o nome aqui"
                            className="inputFormulario"
                        />
                    </label>
                    <br />
                    <label htmlFor="cpf" className="labelFormulario">CPF:
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            placeholder="Insira o CPF"
                            className="inputFormulario"
                        />
                    </label>
                    <br />
                    <label htmlFor="contato" className="labelFormulario">Contato:
                        <input
                            type="tel"
                            name="contato"
                            id="contato"
                            className="inputFormulario"
                            placeholder="Número de contato"
                        />
                    </label>
                    <br />
                    <div className="Opcao">
                        <div className="Opcao_tipo">
                            <p>Tipo sanguíneo:</p>
                            <input
                                type="radio"
                                name="opcao_rh"
                                id="todos"
                            />
                            <label htmlFor="todos">Todos</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="A"
                            />
                            <label htmlFor="A">A</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="B"
                            />
                            <label htmlFor="B">B</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="AB"
                            />
                            <label htmlFor="AB">AB</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="O"
                            />
                            <label htmlFor="O">O</label>
                        </div>
                        <div className="Opcao_rh">
                            <p>Fator RH:</p>
                            <input
                                type="radio"
                                name="opcao_rh"
                                id="todos"
                            />
                            <label htmlFor="todos">Todos</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_rh"
                                id="positivo"
                            />
                            <label htmlFor="positivo">+</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_rh"
                                id="negativo"
                            />
                            <label htmlFor="negativo">-</label>
                        </div>
                    </div>
                    <div className="Botao">
                        <button id="buscar">Buscar</button>
                    </div>
                </form>
            </div>
            <div className="CampoResultadoPesquisa">
                <h1>Resultados da busca devem aparecer aqui</h1>
            </div>
        </body>
    )
}

export default BuscaDoador;