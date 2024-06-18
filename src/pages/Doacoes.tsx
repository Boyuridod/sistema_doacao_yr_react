import React from "react";
// import "../styles/Doacoes.css";

function Doacoes() {

    return (
        <body>
            <div>
                <h1>Doações</h1>
                <form action="">
                    <label htmlFor="">Inicio</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">Fim</label>
                    <input type="date" name="" id="" />
                    <br />
                    <button type="submit">Buscar</button>
                </form>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Volume</th>
                            <th>Tipo</th>
                            <th>RH</th>
                            <th>Doador</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </body>
    )

}

export default Doacoes;