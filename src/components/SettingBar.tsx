import React, { useState } from "react";
import chevronleft from "../image/download.png";
import chevronright from "../image/download (1).png";
import add from "../image/istockphoto-688550958-612x612.jpg";
import less from "../image/download (3).png";

interface SearchBarProps {
  setLimit: React.Dispatch<React.SetStateAction<number>>; // fonctions de mise à jour de l'état (useState)
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ setLimit, setSearchTerm }) => {
  return (
    <div className="resultConfig">
      <button onClick={() => setLimit((limit) => limit + 55)}>
        <img src={chevronleft} alt="" />
      </button>
      <button onClick={() => setLimit((limit) => limit - 10)}>
        <img src={less} alt="" />
      </button>
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "70%",
          border: "none",
          color: "black",
          borderBottom: "2px solid #2196F3",
          textAlign: "center",
          margin: "10px 0",
          padding: "8px",
          outline: "none",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
        }}
      />
      <button onClick={() => setLimit((limit) => limit + 10)}>
        <img src={add} alt="" />
      </button>
      <button onClick={() => setLimit((limit) => (limit = 1025))}>
        <img src={chevronright} alt="" />
      </button>
    </div>
  );
};

export default SearchBar;
