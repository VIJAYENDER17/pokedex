import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar/Navigation";
import Pokemon from "./components/PokemonList/Pokemon";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import Search from "./components/SearchPokemon/Search";
import AbilityDetails from "./components/AbilityDetails/AbilityDetails";



function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
       <Route path="/ability/:name" element={<AbilityDetails />} />
      </Routes>
    </>
  );
}

export default App;
