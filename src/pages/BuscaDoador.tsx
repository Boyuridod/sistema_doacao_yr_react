import React, { useState } from "react";
import "../styles/BuscaDoador.css";

interface Doador {
    codigo: number;
    nome: string;
    cpf: string;
    contato: string;
    tipoSanguineo: string;
    fatorRh: string;
}

function BuscaDoador() {
    const [doadores, setDoadores] = useState<Doador[]>([]);

    const handleBusca = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

        // Obtenha os dados do formulário
        const nomeInput = (document.getElementById("nome") as HTMLInputElement).value.trim();
        const cpfInput = (document.getElementById("cpf") as HTMLInputElement).value.trim();
        const contatoInput = (document.getElementById("contato") as HTMLInputElement).value.trim();
        const tipoSanguineoInput = (document.querySelector('input[name="opcao_tipo"]:checked') as HTMLInputElement)?.value;
        const fatorRhInput = (document.querySelector('input[name="opcao_rh"]:checked') as HTMLInputElement)?.value;

        // Construa os parâmetros da consulta
        const params = new URLSearchParams();
        if (nomeInput) {
            params.append("nome", nomeInput);
        }
        if (cpfInput) {
            params.append("cpf", cpfInput);
        }
        if (contatoInput) {
            params.append("contato", contatoInput);
        }
        if (tipoSanguineoInput) {
            params.append("tipoSanguineo", tipoSanguineoInput);
        }
        if (fatorRhInput) {
            params.append("fatorRh", fatorRhInput);
        }

        // Faz a requisição GET para o backend
        try {
            const response = await fetch(`http://localhost:5000/api/getOneDoador?${params.toString()}`);

            if (response.ok) {
                const data: Doador[] = await response.json();
                setDoadores(data);
                console.log("Busca realizada com sucesso!");
            } else {
                console.error('Falha na busca de doador.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
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
                                id="A"
                                value="A"
                            />
                            <label htmlFor="A">A</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="B"
                                value="B"
                            />
                            <label htmlFor="B">B</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="AB"
                                value="AB"
                            />
                            <label htmlFor="AB">AB</label>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                className="Opcao_tipo"
                                id="O"
                                value="O"
                            />
                            <label htmlFor="O">O</label>
                        </div>
                        <div className="Opcao_rh">
                            <label>Fator RH:</label>
                            <input
                                type="radio"
                                name="opcao_rh"
                                className="Opcao_rh"
                                id="positivo"
                                value="positivo"
                            />
                            <label htmlFor="positivo">+</label>
                            <input
                                type="radio"
                                name="opcao_rh"
                                className="Opcao_rh"
                                id="negativo"
                                value="negativo"
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
