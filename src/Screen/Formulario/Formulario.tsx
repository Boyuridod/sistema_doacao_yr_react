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

  const handleClearForm = () => setFormState({
    texto: "",
    inteiro: "",
    booleano: false, 
    opcaoSelect: "",
    opcaoRadio: ""
  });

  const [responseData, setResponseData] = useState(null);

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
          // Envio bem-sucedido
          return response.json(); // Converter a resposta para JSON
        }
        throw new Error("Erro ao enviar dados.");
      })
      .then((data) => {
        // Armazenar os dados recebidos do backend no estado
        setResponseData(data);

        // Verifica se todos os campos obrigatórios foram preenchidos
        const requiredFieldsFilled =
          formState.texto.trim().length >= 2 &&
          formState.texto.trim().length <= 255 &&
          Number.isInteger(Number(formState.inteiro)) &&
          Number(formState.inteiro) > 0 &&
          Number(formState.inteiro) < 1000 &&
          typeof formState.booleano === "boolean" &&
          formState.opcaoSelect.trim() !== "" &&
          formState.opcaoRadio.trim() !== "";

        // Limpar o estado do formulário apenas se todos os campos obrigatórios estiverem preenchidos
        if (requiredFieldsFilled) {
          handleClearForm();
        }
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
            value="opcaoRadio1"
            checked={formState.opcaoRadio === "opcaoRadio1"}
            onChange={handleChange}
          />
          <label htmlFor="opcaoRadio1">Opção 1</label>
          <br />
          <input
            type="radio"
            name="opcaoRadio"
            id="opcaoRadio2"
            value="opcaoRadio2"
            checked={formState.opcaoRadio === "opcaoRadio2"}
            onChange={handleChange}
          />

          <label htmlFor="opcaoRadio2">Opção 2</label>
          <br />
          <input
            type="radio"
            name="opcaoRadio"
            id="opcaoRadio3"
            value="opcaoRadio3"
            checked={formState.opcaoRadio === "opcaoRadio3"}
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
          <button type="reset" id="limpar" onClick={handleClearForm}>
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
