import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import "../global.d.ts"
// import estilo from "../styles/BuscaDoador.module.css";

interface Doador {
    nome: string;
    cpf: string;
    contato: string;
    tipoSanguineo: string;
    fatorRh: string;
    codigo: number;
}

function BuscaDoador() {
    const initialState = {
        nome: "",
        cpf: "",
        contato: "",
        tipoSanguineo: "",
        fatorRh: ""
    };

    const [doadores, setDoadores] = useState<Doador[]>([]);
    const [searchParams, setSearchParams] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({});
    const [updating, setUpdating] = useState<{ [key: number]: boolean }>({});

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

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch('http://localhost:5000/api/deleteDoador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ codigo })
            });

            if (response.ok) {
                setDoadores(doadores.filter(doador => doador.codigo !== codigo));
            } else {
                console.error('Falha ao excluir doador.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(prevState => ({ ...prevState, [codigo]: !prevState[codigo] }));
    };

    const handleUpdateChange = (codigo: number, event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDoadores(prevDoadores =>
            prevDoadores.map(doador =>
                doador.codigo === codigo ? { ...doador, [name]: value } : doador
            )
        );
    };

    const handleUpdate = async (codigo) => {
        try {
            setUpdating(prevState => ({ ...prevState, [codigo]: true }));
            const updatedDoador = doadores.find(doador => doador.codigo === codigo);
            const response = await fetch('http://localhost:5000/api/updateDoador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDoador)
            });

            if (response.ok) {
                setIsEditing(prevState => ({ ...prevState, [codigo]: false }));
            } else {
                console.error('Falha ao atualizar doador.');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        } finally {
            setUpdating(prevState => ({ ...prevState, [codigo]: false }));
        }
    };

    const handleClear = () => {
        setSearchParams(initialState);
    };

    return (
        <div className={estilo.container}>
            <div className={estilo.searchContainer}>
                <form className={estilo.form} onSubmit={handleSearch} onReset={handleClear}>
                    <h1 className={estilo.title}>Busca de doador</h1>
                    <div className={estilo.inputGroup}>
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
                    <div className={estilo.radioGroup}>
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
                    <div className={estilo.radioGroup}>
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
                    <div className={estilo.div_botoes}>
                        <button type="submit" className={estilo.searchButton} disabled={loading}>
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                        <button type="reset" className={estilo.clearButton}>Limpar</button>
                    </div>
                </form>
            </div>
            <div className={estilo.resultsContainer}>
                <h1>Resultados da busca:</h1>
                {noResults ? <p>Nenhum resultado encontrado.</p> : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Contato</th>
                                <th>Tipo Sanguíneo</th>
                                <th>Fator RH</th>
                                <th>Botão Editar</th>
                                <th>Botão Doação</th>
                                <th>Botão Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doadores.map((doador, index) => (
                                <tr key={index}>
                                    <td>
                                        {isEditing[doador.codigo] ? (
                                            <input
                                                type="text"
                                                name="nome"
                                                value={doador.nome}
                                                onChange={(e) => handleUpdateChange(doador.codigo, e)}
                                            />
                                        ) : (
                                            doador.nome
                                        )}
                                    </td>
                                    <td>{doador.cpf}</td>
                                    <td>
                                        {isEditing[doador.codigo] ? (
                                            <input
                                                type="text"
                                                name="contato"
                                                value={doador.contato}
                                                onChange={(e) => handleUpdateChange(doador.codigo, e)}
                                            />
                                        ) : (
                                            doador.contato
                                        )}
                                    </td>
                                    <td>{doador.tipoSanguineo}</td>
                                    <td>{doador.fatorRh}</td>
                                    <td>
                                        {isEditing[doador.codigo] ? (
                                            <button
                                                onClick={() => handleUpdate(doador.codigo)}
                                                disabled={updating[doador.codigo]}
                                            >
                                                {updating[doador.codigo] ? 'Atualizando...' : 'Salvar'}
                                            </button>
                                        ) : (
                                            <button onClick={() => handleEdit(doador.codigo)}>Editar</button>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/doacao/${doador.codigo}`}>Doar</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(doador.codigo)}>Excluir</button>
                                    </td>
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
