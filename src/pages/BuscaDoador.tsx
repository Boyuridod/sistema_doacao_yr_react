import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BuscaDoador.css";
import ReactModal from 'react-modal';

interface Doador {
    nome: string;
    cpf: string;
    contato: string;
    tipoSanguineo: string;
    fatorRh: string;
    codigo: number;
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

    return (
        <div className="container">
            {/* <button className="back-button" onClick={() => navigate('/')}>Voltar</button> */}
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
                                    <td>
                                        {isEditing[doador.codigo] ? (
                                            <input
                                                type="text"
                                                name="tipoSanguineo"
                                                value={doador.tipoSanguineo}
                                                onChange={(e) => handleUpdateChange(doador.codigo, e)}
                                            />
                                        ) : (
                                            doador.tipoSanguineo
                                        )}
                                    </td>
                                    <td>
                                        {isEditing[doador.codigo] ? (
                                            <input
                                                type="text"
                                                name="fatorRh"
                                                value={doador.fatorRh}
                                                onChange={(e) => handleUpdateChange(doador.codigo, e)}
                                            />
                                        ) : (
                                            doador.fatorRh
                                        )}
                                    </td>
                                    <td>
                                        {isEditing[doador.codigo] ? (
                                            <button
                                                onClick={() => handleUpdate(doador.codigo)}
                                                disabled={updating[doador.codigo]} // Desabilita o botão se a atualização estiver em andamento
                                            >
                                                {updating[doador.codigo] ? 'Atualizando...' : 'Salvar'}
                                            </button>

                                        ) : (
                                            <button onClick={() => handleEdit(doador.codigo)}>Editar</button>
                                        )}
                                    </td>
                                    <td>
                                        <Popup trigger={<button>Nova Doação</button>} position="right center">
                                        <div> Conteúdo do Popup </div>
                                        <button> Fechar </button>
                                        </Popup>
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
