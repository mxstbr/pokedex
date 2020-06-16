// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

function usePokemonGames(pokemon) {
  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    setGames(null);

    if (!pokemon) return;

    fetchPokemonGames(pokemon.game_indices.map(game => game.version.name)).then(
      games => {
        setGames(games);
      }
    );
  }, [pokemon]);

  return games;
}

const PokemonGames = props => {
  const games = usePokemonGames(props.pokemon);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

function usePokemon(name) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    setPokemon(null);

    if (!name) return;

    fetchPokemonByName(name).then(pokemon => {
      setPokemon(pokemon);
    });
  }, [name]);

  return pokemon;
}

const Pokemon = props => {
  const pokemon = usePokemon(props.name);

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
