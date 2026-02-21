import React from "react";
import { Link } from "react-router-dom";

// Module 9: Using React.memo for performance optimization 
const PokemonCard = React.memo(({ poke }) => {
  return (
    <Link
      to={`/pokemon/${poke.id}`}
      className="pokemon-card-link"
      style={{ textDecoration: "none" }}
    >
      <div className={`pokemon-card ${poke.types?.[0]?.type?.name || ""}`}>
        <div className="card-inner">
          <span className="pokemon-id">#{String(poke.id).padStart(3, "0")}</span>
          <img
            src={poke.sprites?.other?.["official-artwork"]?.front_default}
            alt={poke.name}
          />
          <h3>{poke.name}</h3>
          <div className="types">
            {poke.types?.map((type) => (
              <span key={type.slot} className="type-badge">
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default PokemonCard;