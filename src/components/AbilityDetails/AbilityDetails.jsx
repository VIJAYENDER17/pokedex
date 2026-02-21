import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AbilityDetails.css";

export default function AbilityDetails() {
  const { name } = useParams();
  const [abilityData, setAbilityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbility = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
        const data = await res.json();
        setAbilityData(data);
      } catch (err) {
        console.error("Error fetching ability:", err);
      }
      setLoading(false);
    };
    fetchAbility();
  }, [name]);

  if (loading) return (
    <div className="pokeball-loader">
      <div className="pokeball"><div className="pokeball-center"></div></div>
      <p>Fetching Ability Info...</p>
    </div>
  );

  if (!abilityData) return <div className="error">Ability not found.</div>;

  // Get the English description
  const effectDesc = abilityData.effect_entries.find(e => e.language.name === "en")?.effect 
                     || "No description available.";

  return (
    <div className="ability-details-container">
      <Link to="/" className="back-link">← Back to Home</Link>
      
      <div className="ability-card">
        <h1 className="ability-title">{abilityData.name.replace("-", " ")}</h1>
        
        <div className="effect-section">
          <h2>Effect Description</h2>
          <p>{effectDesc}</p>
        </div>

        <div className="pokemon-with-ability">
          <h2>Pokémon with this Ability</h2>
          <div className="mini-grid">
            {abilityData.pokemon.map(({ pokemon }) => (
              <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className="mini-poke-link">
                {pokemon.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}