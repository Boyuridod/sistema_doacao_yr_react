import React from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";

import TelaInicial from "../pages/TelaInicial.jsx";
import CadastroDoador from "../pages/CadastroDoador.jsx";
import BuscaDoador from "../pages/BuscaDoador.jsx";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path='/' element={<TelaInicial />} />
            <Route path='/CadastroDoador' element={<CadastroDoador />} />
            <Route path='/BuscaDoador' element={<BuscaDoador />} />
        </BrowserRouter>
    );
}

export default Routes;