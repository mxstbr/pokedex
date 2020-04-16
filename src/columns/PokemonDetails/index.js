// Renders the profile and games of a single pokemon
import React, { useEffect, useState } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../use-async";
import createResource from "../../create-resource";

const PokemonGames = props => {
  const [games, state] = useAsync(() => {
    if (!props.pokemon) return Promise.resolve(null);

    return fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    );
  }, [props.pokemon]);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

const PokemonDetails = props => {
  const [pokemonResource, setPokemonResource] = useState(null);
  useEffect(() => {
    setPokemonResource(createResource(fetchPokemonByName(props.name)));
  }, [props.name]);

  const pokemon = pokemonResource ? pokemonResource.read() : null;

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

export default PokemonDetails;
