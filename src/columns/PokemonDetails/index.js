// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const PokemonGames = props => {
  const [games, setGames] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    setError(null);
    setGames(null);
    if (!props.pokemon) return;

    setStatus("loading");
    fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    ).then(
      games => {
        setGames(games);
        setStatus("idle");
        setError(null);
      },
      err => {
        setGames(null);
        setStatus("errored");
        setError(err);
      }
    );
  }, [props.pokemon]);

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
  const [pokemon, setPokemon] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setPokemon(null);
    setError(null);
    if (!props.name) return;

    setStatus("loading");
    fetchPokemonByName(props.name).then(
      pokemon => {
        setStatus("idle");
        setError(null);
        setPokemon(pokemon);
      },
      err => {
        setStatus("errored");
        setPokemon(null);
        setError(err);
      }
    );
  }, [props.name]);

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
