import React, { useState, useEffect } from "react";
import "./searchstyle.css";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState([]); 
  const [selectedType, setSelectedType] = useState("all");
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [typeRes, pokeRes] = await Promise.all([
          fetch("https://pokeapi.co/api/v2/type"),
          fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        ]);
        const typeData = await typeRes.json();
        const pokeData = await pokeRes.json();
        
        // Alphabetical sorting of types
        const sortedTypes = typeData.results.sort((a, b) => a.name.localeCompare(b.name));
        
        setTypes(sortedTypes); 
        setAllPokemon(pokeData.results);
      } catch (err) {
        console.error("Error fetching initial data", err);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const filterLogic = async () => {
      // Don't show anything if no search and no type filter
      if (!query.trim() && selectedType === "all") {
        setFilteredResults([]);
        return;
      }

      setLoading(true);
      let listToFetch = allPokemon;

      if (selectedType !== "all") {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const data = await res.json();
        listToFetch = data.pokemon.map(p => p.pokemon);
      }

      if (query.trim()) {
        listToFetch = listToFetch.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Fetch details for cards (Limit to 8 for speed)
      const detailedResults = await Promise.all(
        listToFetch.slice(0, 8).map(async (p) => {
          const res = await fetch(p.url);
          return await res.json();
        })
      );

      setFilteredResults(detailedResults);
      setLoading(false);
    };

    filterLogic();
  }, [query, selectedType, allPokemon]);

  return (
    <div className="search-page-container">
      <div className="search-box">
        <h1>Find Your Pokémon</h1>
        
        <div className="controls-row">
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="type-dropdown"
          >
            <option value="all">Select a Type</option>
            {types.map(type => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="pokeball-loader">
            <div className="pokeball">
              <div className="pokeball-center"></div>
            </div>
            <p>Filtering Pokémon...</p>
          </div>
        ) : (
          <div className="pokemon-list">
            {filteredResults.map(poke => (
                <PokemonCard key={poke.id} poke={poke} />
            ))}
          </div>
        )}

        {!loading && filteredResults.length === 0 && (query || selectedType !== "all") && (
          <p className="no-results">No Pokémon matches your criteria.</p>
        )}

        {!query && selectedType === "all" && (
          <p className="instruction-text">Choose a type or type a name to see cards.</p>
        )}
      </div>
    </div>
  );
}