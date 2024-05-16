import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Home from './page/Home';
import PokeList from './page/PokeList';
import './styles/styles.css';
import PokeDetail from './page/PokeDetail';
import Fav from './page/Favourite';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokeList" element={<PokeList />} />
        <Route path="/PokeDetail/:id/:name" element={<PokeDetail />} />
        <Route path="/PokeDetail/:id" element={<PokeDetail />} />
        <Route path="/Fav" element={<Fav />} />
      </Routes>
    </div>
  );
}

export default App;
