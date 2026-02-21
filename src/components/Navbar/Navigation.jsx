import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigatestyle.css";

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          <h2>Pokédex</h2>
        </div>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/search">
            Search
          </NavLink>
        </div>

      </div>
    </nav>
  );
}
