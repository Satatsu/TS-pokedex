import React, { useEffect, useState } from "react";
import PokemonDetails from "./elements/SeeEvolution";

interface EvoProps {
  id: any;
}

interface EvolutionChain {
  species: {
    name: string;
  };
  evolves_to: EvolutionChain[];
}

const PokeEvo: React.FC<EvoProps> = ({ id }) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await response.json();
        const evolutionChainUrl = data.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        setEvolutionChain(evolutionData.chain);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutionChain();
  }, [id]);

  const renderEvolutionChain = (chain: EvolutionChain) => {
    return (
      <div className="evolution-chain">
        <PokemonDetails name={chain.species.name} />
        {chain.evolves_to.length > 0 && (
          <div className="evolution-children">
            {chain.evolves_to.map((evolution, index) => (
              <div key={index}>
                {renderEvolutionChain(evolution)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="evolution-chain-container">
      <h1>Evolution Chain</h1>
      {evolutionChain ? renderEvolutionChain(evolutionChain) : <p>Loading evolution chain...</p>}
    </div>
  );
};

export default PokeEvo;
