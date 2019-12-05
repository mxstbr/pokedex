// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../use-async";

const usePokemonGames = pokemon => {
  const callback = React.useCallback(
    () =>
      fetchPokemonGames(pokemon.game_indices.map(game => game.version.name)),
    [pokemon]
  );
  const { data, error, status } = useAsync(callback);

  return { status, error, games: data };
};

const PokemonGames = props => {
  const { status, error, games } = usePokemonGames(props.pokemon);

  return (
    <>
      {status === "loading" && <Spinner />}
      {status === "idle" &&
        (games ? <PokemonGamesSection games={games} /> : <div>no games.</div>)}
      {status === "errored" && <div>{error.message}</div>}
    </>
  );
};

function usePokemon(name) {
  const callback = React.useCallback(() => fetchPokemonByName(name), [name]);
  const { data, status, error } = useAsync(callback);

  return { status, error, pokemon: data };
}

const Pokemon = props => {
  const { status, error, pokemon } = usePokemon(props.name);

  return (
    <Column width={1} p={4}>
      {status === "idle" &&
        (pokemon ? (
          <>
            <PokemonProfile pokemon={pokemon} />
            <PokemonGames pokemon={pokemon} />
          </>
        ) : (
          <div>No pokemon selected.</div>
        ))}
      {status === "loading" && <Spinner />}
      {status === "errored" && <div>{error.message}</div>}
    </Column>
  );
};

export default Pokemon;
