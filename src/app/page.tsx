"use client";

import {IBanChecker_Checker} from "../../components/iBanChecker_Checker";
import {useState} from "react";
import {GgT_Euklid_Checker} from "../../components/ggT_Euklid_Checker";
import {GgT_Primzahl_Checker} from "../../components/ggT_Primzahl_Calculator";
import {Modulo_Checker} from "../../components/Modulo_Checker";

const Home = () => {
    const [selectedCalculator, setSelectedCalculator] = useState<number>(0);

    const enum Calculator {
        ggT_Euklid = 0,
        ggT_Primzahl = 1,
        Modulo = 2,
        iBanChecker = 3,
    }

    return (
      <div>
        <select onChange={v => setSelectedCalculator(Number(v.target.value))}>
          <option value={0}>ggT Euklid</option>
          <option value={1}>ggT Primzahl</option>
          <option value={2}>Modulo</option>
          <option value={3}>iBan Checker</option>
        </select>
        {selectedCalculator == Calculator.ggT_Euklid ? <GgT_Euklid_Checker/> : null}
        {selectedCalculator == Calculator.iBanChecker ? <IBanChecker_Checker/> : null}
        {selectedCalculator == Calculator.Modulo ? <Modulo_Checker/> : null}
        {selectedCalculator == Calculator.ggT_Primzahl ? <GgT_Primzahl_Checker/> : null}
      </div>
    )
}

export default Home;
