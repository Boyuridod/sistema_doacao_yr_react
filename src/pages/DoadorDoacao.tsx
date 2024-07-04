import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Doador {
  nome: string;
  cpf: string;
  contato: string;
  tipoSanguineo: string;
  fatorRh: string;
  codigo: number;
}

function DoadorDoacao() {
  const location = useLocation();
  const { codigo } = location.state || {};
  const [doador, setDoador] = useState<Doador | null>(null);
  const [doacao, setDoacao] = useState({ volume: "", data: "", hora: "" });

  useEffect(() => {
    const fetchDoador = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getOneById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigo }), // Envie o código do doador como parâmetro
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar doador: ${response.statusText}`);
        }

        const data: Doador = await response.json();
        setDoador(data); // Define o objeto doador retornado pela API
        // Inicializa os campos da doação após carregar o doador
        setDoacao({
          volume: "",
          data: "", // Ajuste conforme necessário
          hora: "", // Ajuste conforme necessário
        });
      } catch (error) {
        console.error("Erro ao buscar doador:", error);
      }
    };

    fetchDoador();
  }, []);

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
        // Limpar campos do form após submissão bem-sucedida
        setDoacao({
          volume: "",
          data: "",
          hora: "",
        });
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
            {doador ? (
              <tr>
                <td>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={doador.nome}
                    readOnly  // Garante que o input seja somente leitura
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={doador.cpf}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="contato"
                    placeholder="Contato"
                    value={doador.contato}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="tipoSanguineo"
                    placeholder="Tipo Sanguíneo"
                    value={doador.tipoSanguineo}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="fatorRh"
                    placeholder="Fator RH"
                    value={doador.fatorRh}
                    readOnly
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5}>Carregando dados do doador...</td>
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
