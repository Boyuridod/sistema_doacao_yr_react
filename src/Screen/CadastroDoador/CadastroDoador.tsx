import React from "react";
import "../../styles/CadastroDoador/CadastroDoador.css"
// import "../../../public/Images/sala_de_hospital.jpeg"

function CadastroDoador() {

    return (
        <body>
            <div className="ImagemHospital">
                <img src="/Images/sala_de_hospital_cortada.jpeg" alt="Img" />
            </div>
            <div className="area_cadastro">
                <form className="formulario" action="">
                    <h1 className="titulo_formulario">Cadastro de doador</h1>
                    <label htmlFor="nome" className="labelFormulario">Nome:
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira o nome aqui"
                            className="inputFormulario"
                            required
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
                            required
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
                            required
                        />
                    </label>
                    <br />
                    <div className="opcao">
                        <div className="opcao_tipo">
                            <p>Tipo sanguíneo:</p>
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
                        <div className="opcao_rh">
                            <p>Fator RH:</p>
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
                            <br />
                        </div>
                    </div>
                    <div className="div_botoes">
                        <button className="botao" id="cadastrar" type="submit">Cadastrar</button>
                        <button className="botao" id="limpar" type="reset">Limpar</button>
                    </div>
                </form>
            </div>
        </body>
    )

}

export default CadastroDoador;