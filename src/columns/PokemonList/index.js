// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

const PokemonList = props => {
  const [pokemons, setPokemons] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setStatus("loading");
    setPokemons(null);
    setError(null);
    fetchPokemons().then(
      pokemons => {
        setStatus("idle");
        setPokemons(pokemons);
        setError(null);
      },
      err => {
        setStatus("errored");
        setPokemons(null);
        setError(err);
      }
    );
  }, []);

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {!pokemons ? (
        <Spinner />
      ) : (
        pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
        ))
      )}
    </Sidebar>
  );
};

export default PokemonList;
