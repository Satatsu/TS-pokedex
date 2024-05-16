import React from 'react'
//import '../styles/styles.css'
import homeImage from '../image/pokeball-new-nintendo-2ds-xl-pokemon-go-nintendo-3ds-fantasy-trademark-circle-symbol-logo-brand.png'

export default function Navbar() {
  return (
    <div className='navGlobal'>
        <h1><a href="/"><img src={homeImage} alt=""/></a></h1>
        <ul>
            <li> <a href="/PokeList">PokeList</a></li>
            <li> <a href="/PokeDetail/6/charizard">PokeDetail</a></li>
            <li><a href="/Fav">Favourite</a></li>
        </ul>
    </div>
  )
}
