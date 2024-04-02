import React from "react";
import "../styles/Formulario.css";

function FormularioView({ formState, handleClearForm, handleChange, handleSubmit, responseData }) {
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
            <pre>{JSON.stringify(responseData, null, 2)}</pre> {/* Exibir os dados recebidos em formato JSON */}
          </div>
        )}
      </form>
      <img src="/Images/Nuvem.png" alt="Nuvem" />
    </body>
  );
}

export default FormularioView;
