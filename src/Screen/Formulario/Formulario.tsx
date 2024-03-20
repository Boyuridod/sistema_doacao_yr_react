import React, { useState } from "react";
import "../Formulario/Formulario.css";

function Formulario() {
  const [formState, setFormState] = useState({
    texto: "",
    inteiro: 0,
    booleano: false,
    opcaoSelect: "",
  });

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
          return response.text();
        }
        throw new Error("Erro ao enviar dados.");
      })
      .then((data) => {
        console.log(data); // Exibir mensagem de sucesso
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
        </fieldset>
        <div className="botoes_form">
          <button type="submit" id="submit">
            Enviar
          </button>
          <button type="reset" id="limpar">
            Limpar
          </button>
        </div>
      </form>
      <img src="/Images/Nuvem.png" alt="Nuvem" />
    </body>
  );
}

export default Formulario;
