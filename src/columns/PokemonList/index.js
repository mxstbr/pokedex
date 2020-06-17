// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

const createResource = promise => {
  let data = null;
  let error = null;

  promise
    .then(result => {
      data = result;
    })
    .catch(err => {
      error = err;
    });

  return {
    read() {
      if (data) return data;

      if (error) throw error;

      throw promise;
    }
  };
};

const resource = createResource(fetchPokemons());

const PokemonList = props => {
  const data = resource.read();

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {!data ? (
        <div>No data</div>
      ) : (
        data.map(pokemon => (
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
