// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import Sidebar from "../../components/Sidebar";
import LoadingEllipsis from "../../components/LoadingEllipsis";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

const createResource = promise => {
  let status = "loading";
  let data = null;
  let error = null;

  promise.then(
    result => {
      status = "complete";
      data = result;
    },
    err => {
      status = "errored";
      error = err;
    }
  );

  return {
    read() {
      if (status === "complete") return data;
      if (status === "errored") throw error;
      throw promise;
    }
  };
};

const PokemonSidebarItem = ({ pokemon, onClick }) => {
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 3000
  });

  return (
    <Link key={pokemon.name} onClick={() => startTransition(() => onClick())}>
      <SidebarItem>
        {pokemon.name}
        {isPending && <LoadingEllipsis />}
      </SidebarItem>
    </Link>
  );
};

const resource = createResource(fetchPokemons());

function PokemonList(props) {
  const pokemons = resource.read();

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {pokemons && pokemons.length > 0 ? (
        pokemons.map(pokemon => (
          <PokemonSidebarItem
            pokemon={pokemon}
            key={pokemon.name}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          ></PokemonSidebarItem>
        ))
      ) : (
        <div>No pokemons.</div>
      )}
    </Sidebar>
  );
}

export default PokemonList;
