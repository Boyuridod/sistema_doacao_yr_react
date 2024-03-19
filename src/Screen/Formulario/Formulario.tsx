import React from "react";
import "../Formulario/Formulario.css"

function Formulario() {
    return (
        <body>
            <form action="">
                <fieldset>
                    <legend>Formulário</legend>
                    <label htmlFor="">Texto: </label>
                    <input type="text" name="texto" id="texto" placeholder="Digite aqui" />
                    <br />
                    <label htmlFor="inteiro">Inteiro: </label>
                    <input type="number" id="numero" placeholder="Número" step={1} />
                    <br />
                    <label htmlFor="booleano">Booleano: </label>
                    <input type="checkbox" name="booleano" id="booleano" />
                    <br />
                    <label htmlFor="Dropbox">Dropbox: </label>
                    <select name="Dropbox" id="Dropbox" defaultValue="">
                        <option value="" hidden>Selecione uma opção</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                        <option value="opcao4">Opção 4</option>
                    </select>
                </fieldset>
                <button>Botão</button>
                <button>Botão</button>
            </form>
            <img src="/Images/Nuvem.png" alt="Nuvem" />
        </body>
    )
}

export default Formulario;