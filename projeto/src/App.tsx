// src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [response, setResponse] = useState('');

  const handleButtonClick = async (route: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/${route}`);
      setResponse(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setResponse('Erro ao chamar a API');
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('teste')}>Rota 1</button>
      <button onClick={() => handleButtonClick('teste/123')}>Rota 2</button>
      <button onClick={() => handleButtonClick('testeQuery?valor=3&quantidade=1')}>Rota 3</button>
      <div>
        <h3>Resposta da API:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default App;
