// Renders the profile and games of a single pokemon
import React, { useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../use-async";

const PokemonGames = props => {
  const [games, state] = useAsync(() => {
    if (!props.pokemon) return Promise.resolve(null);

    return fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    );
  }, [props.pokemon]);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

const Pokemon = props => {
  const [pokemon, state] = useAsync(() => {
    return fetchPokemonByName(props.name);
  }, [props.name]);

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
