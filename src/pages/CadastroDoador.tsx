import React from "react";
import estilo from "../styles/CadastroDoador.module.css";

function CadastroDoador() {

    const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

        // Obtenha os dados do formulário
        const nomeInput = document.getElementById("nome") as HTMLInputElement | null;
        const cpfInput = document.getElementById("cpf") as HTMLInputElement | null;
        const contatoInput = document.getElementById("contato") as HTMLInputElement | null;
        const tipoSanguineoInput = document.querySelector('input[name="opcao_tipo"]:checked') as HTMLInputElement | null;
        const fatorRhInput = document.querySelector('input[name="opcao_rh"]:checked') as HTMLInputElement | null;

        // Verifica se os elementos foram encontrados antes de acessar suas propriedades
        if (nomeInput && cpfInput && contatoInput && tipoSanguineoInput && fatorRhInput) {
            const nome = nomeInput.value;
            const cpf = cpfInput.value;
            const contato = contatoInput.value;
            const tipoSanguineo = tipoSanguineoInput.value;
            const fatorRh = fatorRhInput.value;

            // Monta o objeto com os dados
            const dadosDoador = {
                nome,
                cpf,
                contato,
                tipoSanguineo,
                fatorRh
            };

            // Faz a requisição POST para o backend
            try {
                //console.log('Dados do doador:', dadosDoador);
                const response = await fetch('http://localhost:5000/api/insertDoador', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosDoador)
                });

                // FIXME Url sendo alterada quando novo doador é cadastrado

                if (response.ok) {
                    console.log("Doador cadastrado com sucesso!");
                    // Realize aqui qualquer ação adicional após o cadastro bem-sucedido
                    window.location.reload();
                } else {
                    console.error('Falha ao cadastrar doador.');
                }
            } catch (error) {
                console.error('Erro ao fazer a requisição:', error);
            }
        } else {
            console.error('Elementos do formulário não foram encontrados.');
        }
    };

    return (
        <body className={estilo.body}>
            {/* <div className={estilo.ImagemHospital}>
                <img src="/Images/sala_de_hospital_cortada.jpeg" alt="Img" id="img"/>
            </div> */}
            <div className={estilo.area_cadastro}>
                <form className={estilo.formulario} onSubmit={handleCadastro}>
                    <h1 className={estilo.titulo_formulario}>Cadastro de doador</h1>
                    <label htmlFor="nome" className={estilo.labelFormulario}>Nome:
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira o nome aqui"
                            className={estilo.inputFormulario}
                            required
                        />
                    </label>
                    <br />
                    <label htmlFor="cpf" className={estilo.labelFormulario}>CPF:
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            placeholder="Insira o CPF"
                            className={estilo.inputFormulario}
                            required
                        />
                    </label>
                    <br />
                    <label htmlFor="contato" className={estilo.labelFormulario}>Contato:
                        <input
                            type="tel"
                            name="contato"
                            id="contato"
                            className={estilo.inputFormulario}
                            placeholder="Número de contato"
                            required
                        />
                    </label>
                    <br />
                    <div className={estilo.opcao}>
                        <div className={estilo.opcao_tipo}>
                            <p>Tipo sanguíneo:</p>
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="A"
                                value="A"
                            />
                            <label htmlFor="A">A</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="B"
                                value="B"
                            />
                            <label htmlFor="B">B</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="AB"
                                value="AB"
                            />
                            <label htmlFor="AB">AB</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_tipo"
                                id="O"
                                value="O"
                            />
                            <label htmlFor="O">O</label>
                        </div>
                        <div className={estilo.opcao_rh}>
                            <p>Fator RH:</p>
                            <input
                                type="radio"
                                name="opcao_rh"
                                id="POSITIVO"
                                value="+"
                            />
                            <label htmlFor="POSITIVO">+</label>
                            <br />
                            <input
                                type="radio"
                                name="opcao_rh"
                                id="NEGATIVO"
                                value="-"
                            />
                            <label htmlFor="NEGATIVO">-</label>
                            <br />
                        </div>
                    </div>
                    <div className={estilo.div_botoes}>
                        <button className={estilo.botaoCadastrar} id="cadastrar" type="submit">Cadastrar</button>
                        <button className={estilo.botaoLimpar} id="limpar" type="reset">Limpar</button>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default CadastroDoador;