import {useState} from "react";

export const GgT_Euklid_Checker = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [steps, setSteps] = useState<string[]>([]);

    const calculateGgT = (a: number, b: number): number => {
        if (b === 0) {
            return a;
        } else {
            setSteps(prevSteps => [...prevSteps, `Berechne ggT(${b}, ${a % b})`]);
            return calculateGgT(b, a % b);
        }
    }

    const handleCalculate = () => {
        setSteps([]);
        setResult(calculateGgT(num1, num2));
    }

    return (
        <div>
            <h1>ggT Euklid Checker:</h1>
            <input type="number" onChange={e => setNum1(Number(e.target.value))} placeholder="Nummer 1"/>
            <input type="number" onChange={e => setNum2(Number(e.target.value))} placeholder="Nummer 2"/>
            <button onClick={handleCalculate}>Berechnen</button>
            <h2>Ergebnis: {result}</h2>
            <h2>Schritte:</h2>
            <ul>
                {steps.map((step, index) => <li key={index}>{step}</li>)}
            </ul>
        </div>
    )
}