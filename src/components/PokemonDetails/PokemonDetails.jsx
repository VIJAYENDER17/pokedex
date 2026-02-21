// components/PokemonDetails/PokemonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PokemonDetails.css";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading) return  <div className="pokeball-loader">
          <div className="pokeball">
            <div className="pokeball-center"></div>
          </div>
          <p>Loading Pokémon...</p>
        </div>;

  if (!pokemon) return <div>Pokémon not found.</div>;

  return (
    <div className="pokemon-details-container">
      <Link to="/" className="back-link">← Back to Pokédex</Link>
      <h1 className="pokemon-name">{pokemon.name.toUpperCase()} #{String(pokemon.id).padStart(3, "0")}</h1>

      <div className="pokemon-main">
        <img
          className="pokemon-image"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />

        <div className="pokemon-info">
          <h2>Types</h2>
          <div className="types">
            {pokemon.types.map(({ type }) => (
              <span key={type.name} className={`type-badge ${type.name}`}>
                {type.name}
              </span>
            ))}
          </div>

<h2>Abilities</h2>
<ul>
  {pokemon.abilities.map(({ ability }) => (
    <li key={ability.name}>
      <Link to={`/ability/${ability.name}`} className="ability-link">
        {ability.name.replace("-", " ")}
      </Link>
    </li>
  ))}
</ul>

          <h2>Stats</h2>
          <ul>
            {pokemon.stats.map(({ stat, base_stat }) => (
              <li key={stat.name}>
                {stat.name}: {base_stat}
              </li>
            ))}
          </ul>

          <h2>Height & Weight</h2>
          <p>Height: {(pokemon.height / 10).toFixed(1)} m</p>
          <p>Weight: {(pokemon.weight / 10).toFixed(1)} kg</p>

          <h2>Base Experience</h2>
          <p>{pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
}
