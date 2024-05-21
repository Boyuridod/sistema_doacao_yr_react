import React, { useState } from "react";
import "../styles/BuscaDoador.css";

function BuscaDoador() {
    const [nome, setNome] = useState('');
    const [resultado, setResultado] = useState(null);

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/getOneDoador?nome=${nome}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setResultado(result);
        } catch (error) {
            console.error('Houve um problema com a solicitação fetch:', error);
            setResultado({ error: 'Doador não encontrado ou erro ao buscar doador' });
        }
    };

    return (
        <div>
            <div className="CampoDePesquisa">
                <form className="Formulario" onSubmit={handleSubmit}>
                    <h1 className="TituloFormulario">Busca de doador</h1>
                    <label htmlFor="nome" className="LabelFormulario">Nome:
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira o nome aqui"
                            className="InputFormulario"
                            value={nome}
                            onChange={handleNomeChange}
                        />
                    </label>
                    <div className="DivBotao">
                        <button id="buscar" type="submit">Buscar</button>
                    </div>
                </form>
            </div>
            <div className="CampoResultadoPesquisa">
                {resultado ? (
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
                        <tbody>
                            <tr>
                                <td>{resultado.codigo}</td>
                                <td>{resultado.nome}</td>
                                <td>{resultado.cpf}</td>
                                <td>{resultado.contato}</td>
                                <td>{resultado.tipoSanguineo}</td>
                                <td>{resultado.fatorRh}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhum resultado encontrado</p>
                )}
            </div>
        </div>
    );
}

export default BuscaDoador;
