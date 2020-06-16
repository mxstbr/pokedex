// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../hooks/use-async";

const PokemonGames = props => {
  const fetchGames = React.useCallback(
    () =>
      fetchPokemonGames(
        props.pokemon.game_indices.map(game => game.version.name)
      ),
    [props.pokemon]
  );
  const [games] = useAsync(fetchGames);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

const Pokemon = props => {
  const fetchPokemon = React.useCallback(() => {
    return fetchPokemonByName(props.name);
  }, [props.name]);

  const [pokemon, { status, error }] = useAsync(fetchPokemon);

  return (
    <Column width={1} p={4}>
      {!props.name ? null : !pokemon ? (
        <Spinner />
      ) : (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      )}
    </Column>
  );
};

export default Pokemon;
