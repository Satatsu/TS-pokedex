import React from 'react';

interface CheckNumberProps {
  id: any;
}

const CheckNumber: React.FC<CheckNumberProps> = ({ id }) => {
  let result;

  switch (true) {
    case id >= 1 && id <= 9:
      result = <div className="result"> _Nº 000{id}</div>;
      break;
    case id >= 10 && id < 100:
      result = <div className="result">_Nº 00{id}</div>;
      break;
    case id >= 100 && id < 1000:
      result = <div className="result" >_Nº 0{id}</div>;
      break;
    case id >= 1000:
      result = <div className="result">_Nº {id}</div>;
      break;
    default:
      result = <div className="default-result">Résultat par défaut</div>;
  }

  return result;
}

export default CheckNumber;


