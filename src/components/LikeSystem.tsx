import React, { useState, useEffect } from 'react';
import liked from "../image/ajouter-des-likes (1).png";
import like from "../image/ajouter-des-likes.png";

interface LikeSystemProps {
  id: number;
}

const LikeSystem: React.FC<LikeSystemProps> = ({ id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const likedPokemons = JSON.parse(localStorage.getItem('likedPokemons') || '[]');
    if (likedPokemons.includes(id)) {
      setIsLiked(true);
    }
  }, [id]);

  const handleClick = (): void => {
    const likedPokemons = JSON.parse(localStorage.getItem('likedPokemons') || '[]');

    if (isLiked) {
      const updatedPokemons = likedPokemons.filter((pokemonId: number) => pokemonId !== id);
      localStorage.setItem('likedPokemons', JSON.stringify(updatedPokemons));
    } else {
      const updatedPokemons = [...likedPokemons, id];
      localStorage.setItem('likedPokemons', JSON.stringify(updatedPokemons));
    }
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <img onClick={handleClick} className="like" src={isLiked ? liked : like} alt="like button" />
    </div>
  );
}

export default LikeSystem;
