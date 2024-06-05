import React, { useEffect, useState } from "react";
import PokemonDetails from "../elements/SeeEvolution";
import arrow from "../../image/icons8-forward-arrow-50.png";

interface EvoProps {
  id: string;
  evolutionChain: EvolutionChain | null;
}

interface EvolutionChain {
  species: {
    name: string;
  };
  evolves_to: EvolutionChain[];
}

const PokeEvolution: React.FC<EvoProps> = ({ id, evolutionChain }) => {
  const renderEvolutionChain = (chain: EvolutionChain) => {
    return (
      <div className="evolution-chain">
        <PokemonDetails name={chain.species.name} />
        {chain.evolves_to.length > 0 && (
          <div className="evolution-children">
            {chain.evolves_to.map((evolution, index) => (
              <div className="arrow" key={index}>
                <img className="arrowImg" src={arrow} alt="arrow" style={{ height: "40px" }} />
                {renderEvolutionChain(evolution)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="evolution-chain-container"   style={{
      width: evolutionChain && evolutionChain.evolves_to.length === 0 ? "50%" : "auto",
    }}>
      <h1>Evolution Chain</h1>
      {evolutionChain ? (
        renderEvolutionChain(evolutionChain)
      ) : (
        <p>Loading evolution chain...</p>
      )}
    </div>
  );
};

export default PokeEvolution;
