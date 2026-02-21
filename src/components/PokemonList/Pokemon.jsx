import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pokemonstyle.css";
import PokemonCard from "../PokemonCard/PokemonCard";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`,
        );
        const data = await res.json();

        // Calculate total pages
        setTotalPages(Math.ceil(data.count / limit));

        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            return await res.json();
          }),
        );

        setPokemon(detailedPokemon);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [page]);

  return (
    <div className="pokedex-container">

      {/* PAGINATION ABOVE */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Next
        </button>
      </div>

      {loading && (
        <div className="pokeball-loader">
          <div className="pokeball">
            <div className="pokeball-center"></div>
          </div>
          <p>Loading Pokémon...</p>
        </div>
      )}

      <div className="pokemon-list">
        {pokemon.map((poke) => (
          // Use the component here
          <PokemonCard key={poke.id} poke={poke} />
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
