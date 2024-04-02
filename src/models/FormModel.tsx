import React, { useState } from "react";

function FormularioModel() {
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return {
    formState,
    handleClearForm,
    handleChange
  };
}

export default FormularioModel;
