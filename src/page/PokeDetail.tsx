import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NextPoke from "../components/NavPoke";
import CheckNumber from "../components/checkNumber";
import PokemonStats from "../components/PokeStats";
import PokeEvolution from "../components/PokeEvolution";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  stats: Stat[];
  sprites: {
    other: {
      home: string;
    };
  };
}
interface Stat {
  base_stat: number;
}
function PokeDetail() {
  const [data, setData] = useState<Pokemon | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  const stats = [
    { name: "HP", value: data.stats[0].base_stat },
    { name: "Attack", value: data.stats[1].base_stat },
    { name: "Defense", value: data.stats[2].base_stat },
    { name: "Special Attack", value: data.stats[3].base_stat },
    { name: "Special Defense", value: data.stats[4].base_stat },
    { name: "Speed", value: data.stats[5].base_stat },
  ];

  return (
    <section className="globalPokeDetail">
        <NextPoke />
      <p>
        {data.name}
        <CheckNumber id={id} />
      </p>
      <div className="infosFetch">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt=""
        />
        <div className="pokeStat">
          <PokemonStats stats={stats} />
        </div>
      </div>
      <div className="chainEvo">
        <PokeEvolution id={id}/>
      </div>

    </section>
  );
}

export default PokeDetail;
