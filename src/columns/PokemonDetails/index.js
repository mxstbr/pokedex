// Renders the profile and games of a single pokemon
import React, { useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const PokemonGames = props => {
  const [games, setGames] = React.useState(null);

  useEffect(() => {
    setGames(null);

    if (!props.pokemon) return;
    fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    ).then(games => {
      setGames(games);
    });
  }, [props.pokemon]);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

const Pokemon = props => {
  const [pokemon, setPokemon] = React.useState(null);

  useEffect(() => {
    setPokemon(null);

    if (!props.name) return;
    fetchPokemonByName(props.name).then(pokemon => {
      setPokemon(pokemon);
    });
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
