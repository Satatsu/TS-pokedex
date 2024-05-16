import {useState} from 'react'
import homeImage from '../image/pokeball-new-nintendo-2ds-xl-pokemon-go-nintendo-3ds-fantasy-trademark-circle-symbol-logo-brand.png'
import menuImage1 from '../image/icons8-menu-128.png';
import menuImage2 from '../image/icons8-cross-50.png';

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuImage, setMenuImage] = useState<string>(menuImage1);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    // Changement de l'image du menu
    setMenuImage(showMenu ? menuImage1 : menuImage2);
  };

  return (
    <div className='navGlobal'>
      <h1><a href="/"><img className="homeBtn" src={homeImage} alt=""/></a></h1>
      <button className="menuButton" onClick={toggleMenu}><img className='img2' src={menuImage} alt="" /></button>
      <ul className={showMenu ? "show" : ""}>
        <li> <a href="/PokeList">PokeList</a></li>
        <li> <a href="/PokeDetail/6/charizard">PokeDetail</a></li>
        <li><a href="/Fav">Favourite</a></li>
      </ul>
    </div>
  );
}

export default Navbar;