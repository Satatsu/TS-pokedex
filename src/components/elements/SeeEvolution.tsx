import React, { useEffect, useState } from "react";

interface PokemonDetailsProps {
  name: string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ name }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  return (
    <div className="pokemon-details">
      {pokemonDetails ? (
        <div>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <h3>{pokemonDetails.name}</h3>
        </div>
      ) : (
        <p>Loading details for {name}...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
