import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaInicial from '../pages/TelaInicial.tsx';
import CadastroDoador from '../pages/CadastroDoador.tsx'
import BuscaDoador from '../pages/BuscaDoador.tsx';

function Rotas(){

    return(

        <Router>
            <Routes>
                <Route path="/" element={<TelaInicial/>}></Route>
                <Route path="/CadastroDoador" element={<CadastroDoador/>}></Route>
                <Route path="/BuscaDoador" element={<BuscaDoador/>}></Route>
            </Routes>
        </Router>

    )

}

export default Rotas;