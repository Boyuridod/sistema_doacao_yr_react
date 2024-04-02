import React, { useState } from "react";
import FormModel from "../models/FormModel";
import FormView from "../views/FormView";

function FormController() {
  const [formState, setFormState] = useState(FormModel);
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

  const handleClearForm = () => setFormState({
    texto: "",
    inteiro: "",
    booleano: false, 
    opcaoSelect: "",
    opcaoRadio: ""
  });

  return (
    <FormView
      formState={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleClearForm={handleClearForm}
      responseData={responseData}
    />
  );
}

export default FormController;