import React, { useState, useEffect } from "react";
import arrow from "../../image/download.png"

interface NewId {
    beforeId: any;
}

interface BeforePoke {
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

const BeforePoke: React.FC<NewId> = (props) => {
  const { beforeId } = props;

  const [nextPokemon, setNextPokemon] = useState<BeforePoke | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${beforeId}`
        );
        const data: BeforePoke = await response.json();
        setNextPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [beforeId]);
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
          <div className="beforeSwitch">
        <img onClick={handLeRedirect} className="arrow" src={arrow} alt="" />
            <img
              src={nextPokemon.sprites.other.home.front_default}
              alt={nextPokemon.name}
            />
          <span>
            <p>{nextPokemon.name}</p>
            <p>Nº 0{nextPokemon.id}</p>
          </span>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BeforePoke;