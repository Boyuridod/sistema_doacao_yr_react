import React from "react";
import "../styles/BuscaDoador.css"

function BuscaDoador() {

    return (
        <body>
            <div className="CampoDePesquisa">
                <form className="Formulario" action="">
                    <h1 className="TituloFormulario">Busca de doador</h1>
                    <label htmlFor="nome" className="LabelFormulario">Nome:
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira o nome aqui"
                            className="InputFormulario"
                        />
                    </label>
                    <label htmlFor="cpf" className="LabelFormulario">CPF:
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            placeholder="Insira o CPF"
                            className="InputFormulario"
                        />
                    </label>
                    <label htmlFor="contato" className="LabelFormulario">Contato:
                        <input
                            type="tel"
                            name="contato"
                            id="contato"
                            className="InputFormulario"
                            placeholder="Número de contato"
                        />
                    </label>
                    <div className="Opcao">
                        <div className="Opcao_tipo">
                            <label>Tipo sanguíneo:</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="todos"
                            />
                            <label htmlFor="todos">Todos</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="A"
                            />
                            <label htmlFor="A">A</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="B"
                            />
                            <label htmlFor="B">B</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="AB"
                            />
                            <label htmlFor="AB">AB</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="O"
                            />
                            <label htmlFor="O">O</label>
                        </div>
                        <div className="Opcao_rh">
                            <label>Fator RH:</label>
                            <input
                                type="radio"
                                name="opcao_rh"
                                className="Opcao_rh"
                                id="todos"
                            />
                            <label htmlFor="todos">Todos</label>
                            <input
                                type="radio"
                                name="opcao_rh"
                                className="Opcao_rh"
                                id="positivo"
                            />
                            <label htmlFor="positivo">+</label>
                            <input
                                type="radio"
                                name="opcao_rh"
                                className="Opcao_rh"
                                id="negativo"
                            />
                            <label htmlFor="negativo">-</label>
                        </div>
                    </div>
                    <div className="DivBotao">
                        <button id="buscar">Buscar</button>
                    </div>
                </form>
            </div>
            <div className="CampoResultadoPesquisa">
                <table className="TabelaResultado">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Contato</th>
                            <th>Tipo Sanguíneo</th>
                            <th>Fator RH</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="CorpoTabela">

                    </tbody>
                </table>
            </div>
        </body>
    )
}

export default BuscaDoador;