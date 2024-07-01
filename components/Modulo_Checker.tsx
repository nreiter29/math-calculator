import { useState } from "react";

export const Modulo_Checker = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(1);
    const [result, setResult] = useState<number>(0);

    const handleCalculate = () => {
        setResult(num1 % num2);
    }

    return (
        <div>
            <h1>Modulo Calculator:</h1>
            <input type="number" onChange={e => setNum1(Number(e.target.value))} placeholder="Nummer 1" />
            <input type="number" onChange={e => setNum2(Number(e.target.value))} placeholder="Nummer 2" />
            <button onClick={handleCalculate}>Berechnen</button>
            <h2>Ergebnis: {result}</h2>
        </div>
    )
}