import React, { useState } from "react";
import "../Formulario/Formulario.css";

function Formulario() {
  const [formState, setFormState] = useState({
    texto: "",
    inteiro: "",
    booleano: false,
    opcaoSelect: "",
    opcaoRadio: ""
  });

  const [responseData, setResponseData] = useState(null); // Estado para armazenar os dados recebidos do backend

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/formulario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Converter a resposta para JSON
        }
        throw new Error("Erro ao enviar dados.");
      })
      .then((data) => {
        setResponseData(data); // Armazenar os dados recebidos do backend no estado
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  return (
    <body>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Formulário</legend>
          <label htmlFor="texto">Texto: </label>
          <input
            type="text"
            name="texto"
            id="texto"
            placeholder="Digite aqui"
            value={formState.texto}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="inteiro">Inteiro: </label>
          <input
            type="number"
            name="inteiro"
            id="inteiro"
            placeholder="Número"
            step={1}
            value={formState.inteiro}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="booleano">Booleano: </label>
          <input
            type="checkbox"
            name="booleano"
            id="booleano"
            checked={formState.booleano}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="opcaoSelect">Dropbox: </label>
          <select
            name="opcaoSelect"
            id="opcaoSelect"
            value={formState.opcaoSelect}
            onChange={handleChange}
          >
            <option value="" hidden>
              Selecione uma opção
            </option>
            <option value="opcao1">Opção 1</option>
            <option value="opcao2">Opção 2</option>
            <option value="opcao3">Opção 3</option>
            <option value="opcao4">Opção 4</option>
          </select>
          <br />
          <label htmlFor="opcaoRadio">Escolha uma opção:</label>
          <br />
          <input
            type="radio"
            name="opcaoRadio"
            id="opcaoRadio1"
            value="opcao1"
            checked={formState.opcaoRadio === "opcao1"}
            onChange={handleChange}
          />
          <label htmlFor="opcaoRadio1">Opção 1</label>
          <br />
          <input
            type="radio"
            name="opcaoRadio"
            id="opcaoRadio2"
            value="opcao2"
            checked={formState.opcaoRadio === "opcao2"}
            onChange={handleChange}
          />
          <label htmlFor="opcaoRadio2">Opção 2</label>
          <br />
          <input
            type="radio"
            name="opcaoRadio"
            id="opcaoRadio3"
            value="opcao3"
            checked={formState.opcaoRadio === "opcao3"}
            onChange={handleChange}
          />
          <label htmlFor="opcaoRadio3">Opção 3</label>
          <br />
          <br />
        </fieldset>
        <div className="botoes_form">
          <button type="submit" id="submit">
            Enviar
          </button>
          <button type="reset" id="limpar">
            Limpar
          </button>
        </div>
        {responseData && ( // Renderizar os dados recebidos somente se houver uma resposta do servidor
          <div className="dados-recebidos">
            <h2>Dados Recebidos do Servidor:</h2>
            <pre>resposta</pre>
            <pre>{JSON.stringify(responseData, null, 2)}</pre> {/* Exibir os dados recebidos em formato JSON */}
          </div>
        )}
      </form>
      <img src="/Images/Nuvem.png" alt="Nuvem" />
    </body>
  );
}

export default Formulario;
