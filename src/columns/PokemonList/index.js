// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

let pokemons = null;
let error = null;
const promise = fetchPokemons()
  .then(data => {
    pokemons = data;
  })
  .catch(err => {
    error = err;
  });

const PokemonList = props => {
  if (error) throw error;
  if (!pokemons) throw promise;

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>

      {pokemons ? (
        pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
        ))
      ) : (
        <div>No pokemons.</div>
      )}
    </Sidebar>
  );
};

export default PokemonList;
