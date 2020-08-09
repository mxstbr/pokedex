// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import Sidebar from "../../components/Sidebar";
import LoadingEllipsis from "../../components/LoadingEllipsis";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons, fetchPokemonByName } from "../../api/pokeapi";

export const createResource = promise => {
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

const PokemonSidebarItem = ({
  pokemon,
  setPokemonResource,
  setSelectedPokemon,
  onClick
}) => {
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 3000
  });

  return (
    <Link
      onClick={() =>
        startTransition(() => {
          setSelectedPokemon(pokemon.name);
          setPokemonResource(createResource(fetchPokemonByName(pokemon.name)));
        })
      }
    >
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
            setPokemonResource={props.setPokemonResource}
            setSelectedPokemon={props.setSelectedPokemon}
          ></PokemonSidebarItem>
        ))
      ) : (
        <div>No pokemons.</div>
      )}
    </Sidebar>
  );
}

export default PokemonList;
