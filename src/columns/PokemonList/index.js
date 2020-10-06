// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";
import createResource from "../../create-resource";

const resource = createResource(fetchPokemons());

function PokemonList(props) {
  const data = resource.read();

  if (!data) return <p>No pokemons.</p>;

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
