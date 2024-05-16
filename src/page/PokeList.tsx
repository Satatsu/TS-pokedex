import React, { useState, useEffect } from "react";
import CreateCard from "../components/CreateCard";
import SettingBar from "../components/SettingBar";
import imgAccueil from "../image/xaj5LX.jpg";

interface Pokemon {
  id: number;
  name: string;
  url: string;
}

function PokeList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number>(55);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const data = await response.json();
        setPokemon(
          data.results.map((poke: any, index: number) => ({
            id: index + 1,
            name: poke.name,
          }))
        );
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchData();
  }, [limit]);

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="searchBar">
        <img src={imgAccueil} alt="img" style={{width: '100%'}} />
        <SettingBar limit={limit} setSearchTerm={setSearchTerm} setLimit={setLimit} />
      </div>

      <div className="all-card">
        {filteredPokemon.map((poke) => (
          <CreateCard
            pokemonId={poke.id}
            name={poke.name}
            key={`card_${poke.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeList;
