import React, { useState, useEffect } from "react";
import arrow from "../../image/download (1).png"

interface NewId {
  nextId: any;
}

interface NextPokemon {
  name: string;
  id: number;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}

const NextPokemon: React.FC<NewId> = (props) => {
  const { nextId } = props;

  const [nextPokemon, setNextPokemon] = useState<NextPokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nextId}`
        );
        const data: NextPokemon = await response.json();
        setNextPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [nextId]);
  console.log(nextPokemon);

  const handLeRedirect = () => {
    if (nextPokemon) {
      window.location.href = `/pokeDetail/${nextPokemon.id}`;
    } else {
      console.log("No next Pokemon data available yet.");
    }
  };

  return (
    <div>
      {nextPokemon ? (
        <div className="nextSwitch">
          <span>
            <p>{nextPokemon.name}</p>
            <p>Nº 0{nextPokemon.id}</p>
          </span>

          <img
            src={nextPokemon.sprites.other.home.front_default}
            alt={nextPokemon.name}
          />
          <img  onClick={handLeRedirect} className="arrow" src={arrow} alt="not-find" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NextPokemon;
