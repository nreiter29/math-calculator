import {useState} from "react";

export const GgT_Primzahl_Checker = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [primeFactors1, setPrimeFactors1] = useState<{ prime: number, count: number }[]>([]);
    const [primeFactors2, setPrimeFactors2] = useState<{ prime: number, count: number }[]>([]);

    const primeFactorize = (n: number) => {
        const factors = [];
        for (let i = 2; i <= n; i++) {
            let count = 0;
            while (n % i === 0) {
                count++;
                n /= i;
            }
            if (count > 0) {
                factors.push({prime: i, count: count});
            }
        }
        return factors;
    }

    const handleFactorize = () => {
        setPrimeFactors1(primeFactorize(num1));
        setPrimeFactors2(primeFactorize(num2));
    }

    const commonFactors = primeFactors1.filter(factor1 => primeFactors2.some(factor2 => factor2.prime === factor1.prime));

    return (
        <div>
            <h1>Primzahl Zerleger:</h1>
            <input type="number" onChange={e => setNum1(Number(e.target.value))} placeholder="Nummer 1"/>
            <input type="number" onChange={e => setNum2(Number(e.target.value))} placeholder="Nummer 2"/>
            <button onClick={handleFactorize}>Zerlegen</button>
            <h2>Primfaktoren von Nummer 1:</h2>
            <ul>
                {primeFactors1.map((factor, index) => <li
                    key={index}>{factor.prime}</li>)}
            </ul>
            <h2>Primfaktoren von Nummer 2:</h2>
            <ul>
                {primeFactors2.map((factor, index) => <li
                    key={index}>{factor.prime}</li>)}
            </ul>
            <h2>Gemeinsame Primfaktoren:</h2>
            <ul>
                {commonFactors.map((factor, index) => <li
                    key={index}>{factor.prime} (Anzahl: {Math.min(factor.count, primeFactors2.find(f => f.prime === factor.prime)?.count || 0)})</li>)}
            </ul>
        </div>
    )
}