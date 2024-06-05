import React, { useState } from 'react';

interface CreateCardProps {
    pokemonId: number;
    name: string;
}

const CreateCard: React.FC<CreateCardProps> = ({ pokemonId, name }) => {
    const [imageError, setImageError] = useState<boolean>(false);

    const handLeRedirect = () => {
        window.location.href = `/PokeDetail/${pokemonId}/${name}`;
    };

    return (
        <div onClick={handLeRedirect} className='card' id={`${pokemonId}`}>
            {!imageError && (
            <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`}
            alt={name}
            onError={() => setImageError(true)}
            style={{
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
            )}
            {imageError && (
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={name}
                />
            )}
            <h3>{name}</h3>
        </div>
    );
};

export default CreateCard;


