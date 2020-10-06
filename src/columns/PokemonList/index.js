// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

let data = null;
const promise = fetchPokemons().then(result => {
  data = result;
});

function PokemonList(props) {
  if (!data) throw promise;

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {data.map(pokemon => (
        <Link
          key={pokemon.name}
          onClick={() => props.setSelectedPokemon(pokemon.name)}
        >
          <SidebarItem>{pokemon.name}</SidebarItem>
        </Link>
      ))}
    </Sidebar>
  );
}

export default PokemonList;
