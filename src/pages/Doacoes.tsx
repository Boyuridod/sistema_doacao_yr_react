import React, { useState } from "react";

// Definindo a interface para a doação
interface Doacao {
    id: number;
    data: string;
    volume: number;
    tipo: string;
    rh: string;
    doador: string;
}

function Doacoes() {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/getFromDate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startDate, endDate })
            });

            if (response.ok) {
                const data: Doacao[] = await response.json();
                setDoacoes(data);
            } else {
                console.error('Failed to fetch doacoes');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Doações</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="start-date">Inicio</label>
                <input 
                    type="date" 
                    id="start-date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
                <label htmlFor="end-date">Fim</label>
                <input 
                    type="date" 
                    id="end-date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
                <br />
                <button type="submit">Buscar</button>
            </form>
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
                    <tbody>
                        {doacoes.map((doacao) => (
                            <tr key={doacao.id}>
                                <td>{new Date(doacao.data).toLocaleDateString()}</td>
                                <td>{new Date(doacao.data).toLocaleTimeString()}</td>
                                <td>{doacao.volume}</td>
                                <td>{doacao.tipo}</td>
                                <td>{doacao.rh}</td>
                                <td>{doacao.doador}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Doacoes;
