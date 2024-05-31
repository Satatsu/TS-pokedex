import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import PokeList from './page/PokeList';
import './styles/styles.css';
import PokeDetail from './page/PokeDetail';
import Fav from './page/Favourite';
import load from '../src/image/chargement-de-cercle.png';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-text">
            {Array.from("LOADING").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>
          <img src={load} alt="Loading..." className="loading-spinner" />
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PokeList" element={<PokeList />} />
            <Route path="/PokeDetail/:id/:name" element={<PokeDetail />} />
            <Route path="/PokeDetail/:id" element={<PokeDetail />} />
            <Route path="/Fav" element={<Fav />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
