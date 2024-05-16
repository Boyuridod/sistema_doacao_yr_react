import React, { useState } from "react";
import "../styles/BuscaDoador.css";

function BuscaDoador() {
    const [doadores, setDoadores] = useState([]);

   function CadastroDoador() {

    const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
        //event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

        // Obtenha os dados do formulário
        const nomeInput = document.getElementById("nome") as HTMLInputElement | null;
        const cpfInput = document.getElementById("cpf") as HTMLInputElement | null;
        const contatoInput = document.getElementById("contato") as HTMLInputElement | null;
        const tipoSanguineoInput = document.querySelector('input[name="opcao_tipo"]:checked') as HTMLInputElement | null;
        const fatorRhInput = document.querySelector('input[name="opcao_rh"]:checked') as HTMLInputElement | null;

        // Verifica se os elementos foram encontrados antes de acessar suas propriedades
        if (nomeInput && cpfInput && contatoInput && tipoSanguineoInput && fatorRhInput) {
            const nome = nomeInput.value;
            const cpf = cpfInput.value;
            const contato = contatoInput.value;
            const tipoSanguineo = tipoSanguineoInput.value;
            const fatorRh = fatorRhInput.value;

            // Monta o objeto com os dados
            const dadosDoador = {
                nome,
                cpf,
                contato,
                tipoSanguineo,
                fatorRh
            };

            // Faz a requisição POST para o backend
            try {
                //console.log('Dados do doador:', dadosDoador);
                const response = await fetch('http://localhost:5000/api/insertDoador', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosDoador)
                });

                if (response.ok) {
                    console.log("Doador cadastrado com sucesso!");
                    // Realize aqui qualquer ação adicional após o cadastro bem-sucedido
                } else {
                    console.error('Falha ao cadastrar doador.');
                }
            } catch (error) {
                console.error('Erro ao fazer a requisição:', error);
            }
        } else {
            console.error('Elementos do formulário não foram encontrados.');
        }
    };

    return (
        <div>
            <div className="CampoDePesquisa">
                <form className="Formulario" onSubmit={handleBusca}>
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
                                defaultChecked
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
                                defaultChecked
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
                        <button id="buscar" type="submit">Buscar</button>
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
                        </tr>
                    </thead>
                    <tbody className="CorpoTabela">
                        {doadores.map((doador) => (
                            <tr key={doador.codigo}>
                                <td>{doador.codigo}</td>
                                <td>{doador.nome}</td>
                                <td>{doador.cpf}</td>
                                <td>{doador.contato}</td>
                                <td>{doador.tipoSanguineo}</td>
                                <td>{doador.fatorRh}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BuscaDoador;