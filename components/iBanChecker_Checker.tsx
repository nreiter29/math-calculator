"use client";

import { useState } from "react";

export const IBanChecker_Checker = () => {
  const iBanLengthObj: { [key: string]: number }[] = [
    { EG: 29 },
    { AL: 28 },
    { DZ: 24 },
    { AD: 24 },
    { AO: 25 },
    { AZ: 28 },
    { BH: 22 },
    { BY: 28 },
    { BE: 16 },
    { BJ: 28 },
    { BA: 20 },
    { BR: 29 },
    { VG: 24 },
    { BG: 22 },
    { BF: 27 },
    { BI: 27 },
    { CR: 22 },
    { CI: 28 },
    { DK: 18 },
    { DE: 22 },
    { DO: 28 },
    { SV: 28 },
    { EE: 20 },
    { FK: 18 },
    { FO: 18 },
    { FI: 18 },
    { FR: 27 },
    { GA: 27 },
    { GE: 22 },
    { GI: 23 },
    { GR: 27 },
    { GL: 18 },
    { GT: 28 },
    { IQ: 23 },
    { IR: 26 },
    { IE: 22 },
    { IS: 26 },
    { IL: 23 },
    { IT: 27 },
    { JO: 30 },
    { CM: 27 },
    { CV: 25 },
    { KZ: 20 },
    { QA: 29 },
    { CG: 27 },
    { XK: 20 },
    { HR: 21 },
    { KW: 30 },
    { LV: 21 },
    { LY: 25 },
    { LB: 28 },
    { LI: 21 },
    { LT: 20 },
    { LU: 20 },
    { MG: 27 },
    { ML: 28 },
    { MT: 31 },
    { MR: 27 },
    { MU: 30 },
    { MD: 24 },
    { MC: 27 },
    { MN: 20 },
    { ME: 22 },
    { MZ: 25 },
    { NL: 18 },
    { MK: 19 },
    { NI: 24 },
    { NO: 15 },
    { AT: 20 },
    { TL: 23 },
    { PK: 24 },
    { PS: 29 },
    { PL: 28 },
    { PT: 25 },
    { RO: 24 },
    { RU: 33 },
    { SM: 27 },
    { ST: 25 },
    { SA: 24 },
    { SE: 24 },
    { CH: 21 },
    { SN: 28 },
    { RS: 22 },
    { SC: 31 },
    { SD: 18 },
    { SK: 24 },
    { SI: 19 },
    { ES: 24 },
    { LC: 32 },
    { CZ: 24 },
    { TN: 24 },
    { TR: 26 },
    { UA: 29 },
    { HU: 28 },
    { VA: 22 },
    { AE: 23 },
    { GB: 22 },
    { CY: 28 },
    { CF: 27 },
  ];

  const [iBanValue, setIBanValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [rightIban, setRightIBan] = useState<string | null>(null);

  const check = (value: string) => {
    const iBanCountry = value.slice(0, 2);
    const countryObj = iBanLengthObj.find((obj) =>
      Object.prototype.hasOwnProperty.call(obj, iBanCountry)
    );

    if (
      countryObj &&
      value.length === countryObj[iBanCountry] &&
      BigInt(
        value.slice(4) +
          (iBanCountry.charCodeAt(0) - 55).toString() +
          (iBanCountry.charCodeAt(1) - 55).toString() +
          value.slice(2, 4).replace(/^0+/, "")
      ) %
        BigInt(97) ===
        BigInt(1)
    ) {
      setRightIBan(null);
      setIsValid(true);
    } else {
      calculateRightIBan(value);
      setIsValid(false);
    }
  };

  const checkIBanLength = (value: string) => {
    const iBanCountry = value.slice(0, 2);
    const countryObj = iBanLengthObj.find((obj) =>
      Object.prototype.hasOwnProperty.call(obj, iBanCountry)
    );

    setIsButtonDisabled(
      !countryObj || value.length !== countryObj[iBanCountry]
    );
  };

  const calculateRightIBan = (value: string) => {
    const iBanCountry = value.slice(0, 2);
    const accountNumber = value.slice(4);
    const countryCodeNumeric = `${iBanCountry.charCodeAt(0) - 55}${
      iBanCountry.charCodeAt(1) - 55
    }`;
    let newCheckDigits = "";

    for (let i = 0; i < 100; i++) {
      const checkDigits = i.toString().padStart(2, "0");
      const potentialIBan = `${accountNumber}${countryCodeNumeric}${checkDigits}`;
      if (BigInt(potentialIBan) % BigInt(97) === BigInt(1)) {
        newCheckDigits = checkDigits;
        break;
      }
    }

    if (newCheckDigits) {
      const correctedIBan = `${iBanCountry}${newCheckDigits}${accountNumber}`;
      setRightIBan(correctedIBan);
    } else {
      setRightIBan(null);
    }
  };

  return (
    <div>
      <h1>iBan Checker:</h1>
      <input
        onChange={(v) => {
          setIBanValue(v.target.value), checkIBanLength(v.target.value);
        }}
        placeholder="iBan"
      />
      <button disabled={isButtonDisabled} onClick={() => check(iBanValue)}>
        Check
      </button>
      <h1>{isValid ? "Valid" : "Invalid"}</h1>
      {rightIban}
    </div>
  );
};
