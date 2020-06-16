// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";
import useAsync from "../../hooks/use-async";

const PokemonList = props => {
  const [pokemons, { status, error }] = useAsync(fetchPokemons);

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {status === "error" && <div>{error}</div>}
      {status === "loading" && <Spinner />}
      {status === "idle" &&
        (!pokemons ? (
          <div>No pokemons</div>
        ) : (
          pokemons.map(pokemon => (
            <Link
              key={pokemon.name}
              onClick={() => props.setSelectedPokemon(pokemon.name)}
            >
              <SidebarItem>{pokemon.name}</SidebarItem>
            </Link>
          ))
        ))}
    </Sidebar>
  );
};

export default PokemonList;
