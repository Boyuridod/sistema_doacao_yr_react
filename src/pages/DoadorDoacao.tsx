import React from "react";
// import '../styles/DoadorDoacao.css'

function DoadorDoacao() {

    return (
        <body>
            <div className="tabela_doador">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Contato</th>
                            <th>Tipo Sanguíneo</th>
                            <th>Fator RH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tabela_doacoes">
                <table>
                    <thead>
                        <tr>
                            <th>Volume(ml)</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="cadastra_doacao">
                <form action="">
                    <h1>Nova Doação</h1>
                    <label htmlFor="">Volume(ml):</label>
                    <input type="number" />
                    <label htmlFor="">Data da doação:</label>
                    <input type="date" />
                    <label htmlFor="">Hora:</label>
                    <input type="time" name="" id="" />
                    <br />
                    <button type="submit">Cadastrar nova doacao</button>
                    <button type="reset">Limpar</button>
                </form>
            </div>
        </body>

    );

}

export default DoadorDoacao;