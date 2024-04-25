import React from "react";
import "../../styles/CadastroDoador/CadastroDoador.css"
// import "../../../public/Images/sala_de_hospital.jpeg"

function CadastroDoador() {

    return (
        <body>
            <div className="imagem_hospital">
                <img src="/Images/sala_de_hospital_cortada.jpeg" alt="Img" />
            </div>
            <div className="area_cadastro">
                <form className="formulario" action="">
                <h1>Cadastro de doador</h1>
                    <fieldset>
                        <label htmlFor="nome">Nome:
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Insira o nome aqui"
                                required
                            />
                        </label>
                        <br />
                        <label htmlFor="cpf">CPF:
                            <input
                                type="text"
                                name="cpf"
                                id="cpf"
                                placeholder="Insira o CPF"
                                required
                            />
                        </label>
                        <br />
                        <label htmlFor="contato">Contato:
                            <input
                                type="tel"
                                name="contato"
                                id="contato"
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
                    </fieldset>
                </form>
            </div>
        </body>
    )

}

export default CadastroDoador;