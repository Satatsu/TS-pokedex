import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NextPoke from "../components/NavPoke";
import CheckNumber from "../components/checkNumber";
import PokemonStats from "../components/PokeStats";
import StatDetail from "../components/StatDetail";
import PokeEvolution from "../components/PokeEvolution";
import liked from "../image/ajouter-des-likes (1).png"
import like from "../image/ajouter-des-likes.png"

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  stats: Stat[];
  sprites: {
    other: {
      home: { front_default: string };
    };
  };
  abilities: Ability[];
  types: Type[];
}

interface Stat {
  base_stat: number;
}

interface PhysicalStat {
  height: number;
  weight: number;
  abilities: Ability[];
}

interface Ability {
  ability: { name: string };
  is_hidden: boolean;
  slot: number;
}

interface Type {
  type: { name: string };
}

interface EvolutionChain {
  species: {
    name: string;
  };
  evolves_to: EvolutionChain[];
}

function PokeDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Pokemon | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string>('PokemonStats');

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setData(data);

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();
        setEvolutionChain(evolutionData.chain);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

  const statPhysical: PhysicalStat = {
    height: data.height / 10,
    weight: data.weight / 10,
    abilities: data.abilities.map(ability => ({ ...ability }))
  };
 
  const handleButtonClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <section className="globalPokeDetail">
      <NextPoke />
      <p>
        {data.name}
        <CheckNumber id={id} />
      </p>
      <img className="like" src={like} alt="" />
      <div className="infosFetch">

        <img
          src={data.sprites.other.home.front_default}
          alt={data.name}
        />
      <div className="type">
          {data.types.map((type, index) => (
          <h4 key={index}>{type.type.name}</h4>
        ))}
      </div>
        <div className="navBar">
          <button 
            className={selectedComponent === 'PokemonStats' ? 'active' : ''}
            onClick={() => handleButtonClick('PokemonStats')}
          >
            Show Pokemon Stats
          </button>
          <button 
            className={selectedComponent === 'StatDetail' ? 'active' : ''}
            onClick={() => handleButtonClick('StatDetail')}
          >
            Show Stats Detail
          </button>
        </div>
        <div className="pokeStat">  
          {selectedComponent === 'PokemonStats' ? <PokemonStats stats={stats} /> : <StatDetail statPhysical={statPhysical} />}
        </div>
      </div>
      {id && (
        <div
          className="chainEvo"
          style={{
            display: evolutionChain && evolutionChain.evolves_to.length === 0 ? "flex" : "block"
          }}
        >
          <PokeEvolution id={id} evolutionChain={evolutionChain} />
        </div>
      )}
    </section>
  );
}

export default PokeDetail;
