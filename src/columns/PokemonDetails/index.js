// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

function PokemonGames(props) {
  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    setGames(null);

    fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    ).then(data => {
      if (cancelled) return;
      setGames(data);
    });

    return () => {
      cancelled = true;
    };
  }, [props.pokemon.game_indices]);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
}

function Pokemon(props) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    setPokemon(null);

    if (!props.name) return;
    fetchPokemonByName(props.name).then(data => {
      if (cancelled) return;
      setPokemon(data);
    });

    return () => {
      cancelled = true;
    };
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
}

export default Pokemon;
