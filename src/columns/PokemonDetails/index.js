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

const Pokemon = props => {
  const pokemon = props.resource.read();

  return (
    <Column width={1} p={4}>
      {pokemon ? (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      ) : (
        <div>No pokemon selected.</div>
      )}
    </Column>
  );
};

export default Pokemon;
