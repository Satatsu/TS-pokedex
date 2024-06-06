import React from "react";
import charizard from "../image/desktop-wallpaper-mega-charizard-x-pokemon-mega-charizard-x.jpg";
import acceuil from "../image/pokemon-1920x1080.jpg";
import fav from "../image/favorites.png";

function Home() {

  const handLeRedirect = () => {
    window.location.href = "/Fav";
  }
  const handLeRedirect1 = () => {
    window.location.href = "/PokeList";
  }
  const handLeRedirect2 = () => {
    window.location.href = "/PokeDetail/6/charizard";
  }

  return (
    <div className='homeContainer'>
      <div className='title'>
        <h1>Welcome to Your Pokedex</h1>
        <p>Created by Satatsu, code here:<a href="https://github.com/Satatsu/TS-pokedex">https://github.com/Satatsu/TS-pokedex</a> </p>
      </div>
      <div className='homeGlobal'>
        <span className='description'>
          <img src={charizard} alt="Mega Charizard X" />
          <button onClick={handLeRedirect2}>See Pokemon</button>
        </span>
        <span className="description">
          <img src={acceuil} alt="Pokedex Home" />
          <button onClick={handLeRedirect1}>Search Pokemon</button>
        </span>
        <span className="description">
          <img src={fav} alt="Favorites" />
          <button onClick={handLeRedirect}>See Favourite</button>
        </span>
      </div>
      <div className='footer'></div>
    </div>
  );
}

export default Home;
