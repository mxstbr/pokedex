// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import LoadingEllipsis from "../../components/LoadingEllipsis";
import { fetchPokemons } from "../../api/pokeapi";
import createResource from "../../resource";

const PokemonSidebarItem = ({ pokemon, onClick }) => {
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 2000
  });

  return (
    <Link onClick={() => startTransition(() => onClick())}>
      <SidebarItem>
        {pokemon.name}
        {isPending && <LoadingEllipsis />}
      </SidebarItem>
    </Link>
  );
};

const resource = createResource(fetchPokemons());

const PokemonList = props => {
  const pokemons = resource.read();

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {!pokemons ? (
        <Spinner />
      ) : (
        pokemons.map(pokemon => (
          <PokemonSidebarItem
            key={pokemon.name}
            pokemon={pokemon}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          />
        ))
      )}
    </Sidebar>
  );
};

export default PokemonList;
