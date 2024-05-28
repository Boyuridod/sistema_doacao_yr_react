import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BuscaDoador.css";

interface Doador {
    nome: string;
    cpf: string;
    contato: string;
    tipoSanguineo: string;
    fatorRh: string;
}

function BuscaDoador() {
    const navigate = useNavigate();
    const [doadores, setDoadores] = useState<Doador[]>([]);
    const [searchParams, setSearchParams] = useState({
        nome: "",
        cpf: "",
        contato: "",
        tipoSanguineo: "",
        fatorRh: ""
    });
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setNoResults(false);

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
                if (data.length === 0) {
                    setNoResults(true);
                }
            } else {
                console.error('Falha ao buscar doadores.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <button className="back-button" onClick={() => navigate('/TelaInicial')}>Voltar</button>
            <div className="search-container">
                <form className="form" onSubmit={handleSearch}>
                    <h1 className="title">Busca de doador</h1>
                    <div className="input-group">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={searchParams.nome}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="cpf"
                            placeholder="CPF"
                            value={searchParams.cpf}
                            onChange={handleInputChange}
                        />
                        <input
                            type="tel"
                            name="contato"
                            placeholder="Contato"
                            value={searchParams.contato}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="radio-group">
                        <input
                            type="radio"
                            name="tipoSanguineo"
                            id="A"
                            value="A"
                            checked={searchParams.tipoSanguineo === 'A'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="A">A</label>
                        <input
                            type="radio"
                            name="tipoSanguineo"
                            id="B"
                            value="B"
                            checked={searchParams.tipoSanguineo === 'B'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="B">B</label>
                        <input
                            type="radio"
                            name="tipoSanguineo"
                            id="AB"
                            value="AB"
                            checked={searchParams.tipoSanguineo === 'AB'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="AB">AB</label>
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
                    <div className="radio-group">
                        <input
                            type="radio"
                            name="fatorRh"
                            id="positivo"
                            value="+"
                            checked={searchParams.fatorRh === '+'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="positivo">+</label>
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
                    <button type="submit" className="search-button" disabled={loading}>
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                </form>
            </div>
            <div className="results-container">
                <h1>Resultados da busca:</h1>
                {noResults ? <p>Nenhum resultado encontrado.</p> : (

                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Contato</th>
                                <th>Tipo Sanguíneo</th>
                                <th>Fator RH:</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {doadores.map((doador, index) => (
                                <tr key={index}>
                                    <th>{doador.nome}</th>
                                    <th>{doador.cpf}</th>
                                    <th>{doador.contato}</th>
                                    <th>{doador.tipoSanguineo}</th>
                                    <th>{doador.fatorRh}</th>
                                    <th><button>Editar</button></th>
                                    <th><button>Excluir</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}
            </div>
        </div>
    );
}

export default BuscaDoador;
