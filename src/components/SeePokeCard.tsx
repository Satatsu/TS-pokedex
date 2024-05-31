import { FC, useEffect, useState } from 'react';
import chargement from '../image/chargement-de-cercle.png';

interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
}

interface PokemonCardsProps {
  pokemonName: string;
}

const PokemonCards: FC<PokemonCardsProps> = ({ pokemonName }) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonCards = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const cardsData: PokemonCard[] = data.data.map((card: any) => ({
          id: card.id,
          name: card.name,
          imageUrl: card.images.small,
        }));
        setCards(cardsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonCards();
  }, [pokemonName]);

  console.log(cards);

  if (loading) return <img src={chargement} alt="loading..." style={{ width: '50px', animation: 'spin 2s linear infinite' }} />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pokemon-cards-container">
      {cards.map((card) => (
        <div key={card.id} className="pokemon-card">
          <img src={card.imageUrl} alt={card.name} />
        </div>
      ))}
    </div>
  );
};

export default PokemonCards;
