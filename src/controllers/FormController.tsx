import React, { useState } from "react";
import FormModel from '../models/FormModel.tsx';
import FormView from '../views/FormView.tsx';

function FormController() {
  const { formState, handleClearForm, handleChange } = FormModel();
  const [responseData, setResponseData] = useState(null);

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
    <FormView
      formState={formState}
      handleClearForm={handleClearForm}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      responseData={responseData}
    />
  );
}

export default FormController;
