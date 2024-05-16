import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NextPoke from '../components/NavPoke';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
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

  return (
    <div>
      <div>
        <NextPoke/>
      </div>
      <h2>Details for Pokémon with ID: {id}</h2>
      <ul>
        <li>Name: {data.name}</li>
        <li>Height: {data.height}</li>
        <li>Weight: {data.weight}</li>
        {/* Add other details you want to display here */}
      </ul>
    </div>
  );
}

export default PokeDetail;
