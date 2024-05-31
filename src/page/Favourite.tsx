import React, { useEffect, useState } from 'react';
import liked from '../image/ajouter-des-likes (1).png';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const Favourite: React.FC = () => {
  const [likedPokemons, setLikedPokemons] = useState<number[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedLikedPokemons = JSON.parse(localStorage.getItem('likedPokemons') || '[]');
    setLikedPokemons(storedLikedPokemons);
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const detailsPromises = likedPokemons.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!response.ok) {
            throw new Error("Erreur lors du chargement des données");
          }
          const data = await response.json();
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
          };
        });
        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    if (likedPokemons.length > 0) {
      fetchPokemonDetails();
    }
  }, [likedPokemons]);

  const handleUnlike = (id: number) => {
    const updatedLikedPokemons = likedPokemons.filter(pokemonId => pokemonId !== id);
    setLikedPokemons(updatedLikedPokemons);
    localStorage.setItem('likedPokemons', JSON.stringify(updatedLikedPokemons));
    setPokemonDetails(pokemonDetails.filter(pokemon => pokemon.id !== id));
  };

  const handleRemoveAll = () => {
    setLikedPokemons([]);
    localStorage.removeItem('likedPokemons');
    setPokemonDetails([]);
  };

  const handLeRedirect = (id: number) => {
    window.location.href = `/PokeDetail/${id}`;
  };

  return (
    <div className='favourite-container'>
      <h1>Favourite Pokémon :</h1>
      {likedPokemons.length > 0 && (
        <button className='remove-all-button' onClick={handleRemoveAll}>Remove All</button>
      )}
      {pokemonDetails.length > 0 ? (
        <ul className='pokemon-list'>
          {pokemonDetails.map((pokemon) => (
            <li key={pokemon.id} className='pokemon-card' >
              <img onClick={() => handLeRedirect(pokemon.id)} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`} alt={pokemon.name} />
              <p onClick={() => handLeRedirect(pokemon.id)}>{pokemon.name}</p>
              <img 
                src={liked} 
                alt="unlike" 
                className='liked-icon' 
                onClick={() => handleUnlike(pokemon.id)} 
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className='no-favourites'>No favourite Pokémon yet but you can add in <a href="/PokeDetail/1">here</a>.</p>
      )}
    </div>
  );
}

export default Favourite;

