import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Doador {
  nome: string;
  cpf: string;
  contato: string;
  tipoSanguineo: string;
  fatorRh: string;
}

function DoadorDoacao() {
  const { codigo } = useParams<{ codigo: string }>();
  const [doador, setDoador] = useState<Doador | null>(null);
  const [doacao, setDoacao] = useState({ volume: "", data: "", hora: "" });

  useEffect(() => {
    const fetchDoador = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getOneDoador`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigo }), // Envie o código do doador como parâmetro
        });
        const data: Doador = await response.json();
        setDoador(data); // Define o objeto doador retornado pela API
      } catch (error) {
        console.error("Erro ao buscar doador:", error);
      }
    };

    fetchDoador();
  }, [codigo]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDoacao((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/insertDoacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...doacao, doador: codigo }),
      });

      if (response.ok) {
        alert("Doação registrada com sucesso!");
      } else {
        alert("Erro ao registrar doação.");
      }
    } catch (error) {
      console.error("Erro ao registrar doação:", error);
    }
  };

  return (
    <div>
      <div className="tabela_doador">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Contato</th>
              <th>Tipo Sanguíneo</th>
              <th>Fator RH</th>
            </tr>
          </thead>
          <tbody>
            {doador && (
              <tr>
                <td>{doador.nome}</td>
                <td>{doador.cpf}</td>
                <td>{doador.contato}</td>
                <td>{doador.tipoSanguineo}</td>
                <td>{doador.fatorRh}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="cadastra_doacao">
        <form onSubmit={handleSubmit}>
          <h1>Nova Doação</h1>
          <label htmlFor="volume">Volume(ml):</label>
          <input
            type="number"
            name="volume"
            value={doacao.volume}
            onChange={handleInputChange}
          />
          <label htmlFor="data">Data da doação:</label>
          <input
            type="date"
            name="data"
            value={doacao.data}
            onChange={handleInputChange}
          />
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            name="hora"
            value={doacao.hora}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit">Cadastrar nova doação</button>
          <button type="reset">Limpar</button>
        </form>
      </div>
    </div>
  );
}

export default DoadorDoacao;
