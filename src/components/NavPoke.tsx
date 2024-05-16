import React from "react";
import { useParams } from "react-router-dom";
import NextPoke from "./elements/NextPokemon";
import BeforePoke from "./elements/BeforePokemon";

function NavPoke() {
  const  {id}  = useParams<{ id: string }>();
   const idAsNumber = id ? parseInt(id, 10) : NaN;
   const isValidId = !isNaN(idAsNumber) && isFinite(idAsNumber);
   const nextId = isValidId ? idAsNumber + 1 : NaN;
   const beforeId = isValidId ? idAsNumber - 1 : NaN;
  return (
    <div className="globalSwitch">
      <BeforePoke beforeId={beforeId || ''}/>
      <NextPoke nextId={nextId || ''}/>
    </div>
  );
}

export default NavPoke;
