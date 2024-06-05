import React, { useState, useEffect } from "react";
import CreateCard from "../components/Detail/CreateCard";
import SettingBar from "../components/List/SettingBar";
import imgAccueil from "../image/xaj5LX.jpg";

interface Pokemon {
  id: number;
  name: string;
}

function PokeList() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPages = 41;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const data = await response.json();
        setAllPokemon(
          data.results.map((poke: any, index: number) => ({
            id: index + 1,
            name: poke.name,
          }))
        );
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const filteredPokemon = allPokemon.filter((poke) =>
      poke.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * limit;
    const paginatedPokemon = filteredPokemon.slice(startIndex, startIndex + limit);

    setPokemon(paginatedPokemon);
  }, [allPokemon, searchTerm, currentPage, limit]);

  const totalPages = Math.min(Math.ceil(allPokemon.length / limit), maxPages);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="searchBar">
        <img src={imgAccueil} alt="img" style={{ width: '100%' }} />
        <SettingBar limit={limit} setSearchTerm={setSearchTerm} setLimit={setLimit} />
      </div>

      <div className="scroll-container">
        <div className="all-card">
          {pokemon.map((poke) => (
            <CreateCard
              pokemonId={poke.id}
              name={poke.name}
              key={`card_${poke.id}`}
            />
          ))}
        </div>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PokeList;
