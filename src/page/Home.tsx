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
    <div className='homeGlobal' style={{ padding: '20px', boxSizing: 'border-box' }}>
      <span className='description'>
        <img style={{ width: '60%', borderRadius: "60px" }} src={charizard} alt="" />
        <button onClick={handLeRedirect2}>see Pokemon</button>
      <img style={{marginTop: '150px'}}  src={acceuil} alt="" />
        <button onClick={handLeRedirect1}>search Pokemon</button>
      <img style={{width: '60%',marginTop: '150px'}}  src={fav} alt="" />
        <button onClick={handLeRedirect}>see favourite</button>
      </span>
    </div>
  );
}


export default Home;
