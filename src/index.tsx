import React from 'react';
import ReactDOM from 'react-dom';
// import Inicial from './Screen/Inicial/Inicial.tsx';
import Formulario from './Screen/Formulario/Formulario.tsx';
// import NewFormulario from './Screen/Formulario/NewFormulario.tsx';

ReactDOM.render(
  <React.StrictMode>
    {/* <Inicial /> */}
    <Formulario />
    {/* <NewFormulario /> */}
  </React.StrictMode>,
  document.getElementById('root')
);