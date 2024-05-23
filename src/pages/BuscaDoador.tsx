import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/BuscaDoador.css";

interface Doador {
    nome: string;
    cpf: string;
    contato: string;
    tipoSanguineo: string;
    fatorRh: string;
}

function BuscaDoador() {
    const [doadores, setDoadores] = useState<Doador[]>([]);
    const [searchParams, setSearchParams] = useState({
        nome: "",
        cpf: "",
        contato: "",
        tipoSanguineo: "",
        fatorRh: ""
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Sending search parameters:', searchParams);

        try {
            const response = await fetch('http://localhost:5000/api/getOneDoador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchParams)
            });

            if (response.ok) {
                const data: Doador[] = await response.json();
                setDoadores(data);
            } else {
                console.error('Falha ao buscar doadores.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    return (
        <div>
            <div className="CampoDePesquisa">
                <form className="formulario" onSubmit={handleSearch}>
                    <h1 className="titulo_formulario">Busca de doador</h1>
                    <label htmlFor="nome" className="labelFormulario">Nome:
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira o nome aqui"
                            className="inputFormulario"
                            value={searchParams.nome}
                            onChange={handleInputChange}
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
                            value={searchParams.cpf}
                            onChange={handleInputChange}
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
                            value={searchParams.contato}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <div className="Opcao">
                        <div className="Opcao_tipo">
                            <p>Tipo sanguíneo:</p>
                            <input
                                type="radio"
                                name="tipoSanguineo"
                                id="A"
                                value="A"
                                checked={searchParams.tipoSanguineo === 'A'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="A">A</label>
                            <br />
                            <input
                                type="radio"
                                name="tipoSanguineo"
                                id="B"
                                value="B"
                                checked={searchParams.tipoSanguineo === 'B'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="B">B</label>
                            <br />
                            <input
                                type="radio"
                                name="tipoSanguineo"
                                id="AB"
                                value="AB"
                                checked={searchParams.tipoSanguineo === 'AB'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="AB">AB</label>
                            <br />
                            <input
                                type="radio"
                                name="tipoSanguineo"
                                id="O"
                                value="O"
                                checked={searchParams.tipoSanguineo === 'O'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="O">O</label>
                        </div>
                        <div className="Opcao_rh">
                            <p>Fator RH:</p>
                            <input
                                type="radio"
                                name="fatorRh"
                                id="positivo"
                                value="+"
                                checked={searchParams.fatorRh === '+'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="positivo">+</label>
                            <br />
                            <input
                                type="radio"
                                name="fatorRh"
                                id="negativo"
                                value="-"
                                checked={searchParams.fatorRh === '-'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="negativo">-</label>
                        </div>
                    </div>
                    <div className="Botao">
                        <button type="submit" id="buscar">Buscar</button>
                    </div>
                </form>
            </div>
            <div className="CampoResultadoPesquisa">
                <h1>Resultados da busca:</h1>
                {doadores.length > 0 ? (
                    <ul>
                        {doadores.map((doador, index) => (
                            <li key={index}>
                                <p>Nome: {doador.nome}</p>
                                <p>CPF: {doador.cpf}</p>
                                <p>Contato: {doador.contato}</p>
                                <p>Tipo Sanguíneo: {doador.tipoSanguineo}</p>
                                <p>Fator RH: {doador.fatorRh}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum resultado encontrado.</p>
                )}
            </div>
        </div>
    );
}

export default BuscaDoador;
