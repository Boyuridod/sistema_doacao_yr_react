import React from 'react';
import Axios from 'axios';


const Buttons: React.FC = () => {
    const handleClick = async (url: string) => {
      try {
        const response = await Axios.get(`http://localhost:5000${url}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <p>TESTE DE FUNCIONALIDADE</p>
        <button onClick={() => handleClick('/teste')}>TesteURL</button>
        <button onClick={() => handleClick('/teste/:123')}>TesteURL com parâmetro</button>
        <button onClick={() => handleClick('/testeQuery?valor=3&quantidade=1')}>TesteURL com query</button>
      </div>
    );
  };


  export default Buttons;
  