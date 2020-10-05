// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

function usePokemons() {
  const [pokemons, setPokemons] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setStatus("loading");
    setError(null);
    setPokemons(null);

    fetchPokemons()
      .then(pokemons => {
        setStatus("idle");
        setError(null);
        setPokemons(pokemons);
      })
      .catch(err => {
        setStatus("error");
        setError(err);
        setPokemons(null);
      });
  }, []);

  return { status, error, pokemons };
}

function PokemonList(props) {
  const { status, error, pokemons } = usePokemons();

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {status === "loading" && <Spinner />}
      {status === "error" && <div>{error.message}</div>}
      {status === "idle" &&
        (pokemons ? (
          pokemons.map(pokemon => (
            <Link
              key={pokemon.name}
              onClick={() => props.setSelectedPokemon(pokemon.name)}
            >
              <SidebarItem>{pokemon.name}</SidebarItem>
            </Link>
          ))
        ) : (
          <div>No pokemons</div>
        ))}
    </Sidebar>
  );
}

export default PokemonList;
