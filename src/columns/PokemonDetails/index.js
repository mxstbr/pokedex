// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

function useAsync(fn, deps) {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    setData(null);
    setError(null);
    setStatus("loading");
    fn().then(
      data => {
        if (cancelled) return;
        setStatus("idle");
        setData(data);
      },
      err => {
        if (cancelled) return;
        setStatus("error");
        setError(err);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [fn]);

  return {
    status,
    data,
    error
  };
}

function PokemonGames(props) {
  const { data: games, status, error } = useAsync(
    () =>
      fetchPokemonGames(
        props.pokemon.game_indices.map(game => game.version.name)
      ),
    [props.pokemon]
  );

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
}

function usePokemon(name) {
  const [pokemon, setPokemon] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    let cancelled = false;
    setPokemon(null);
    if (!name) return;

    setStatus("loading");
    fetchPokemonByName(name).then(
      data => {
        if (cancelled) return;
        setStatus("idle");
        setPokemon(data);
      },
      err => {
        if (cancelled) return;
        setStatus("error");
      }
    );

    return () => {
      cancelled = true;
    };
  }, [name]);

  return { status, pokemon };
}

function Pokemon(props) {
  const { pokemon, status } = usePokemon(props.name);

  return (
    <Column width={1} p={4}>
      {status === "loading" && <Spinner />}
      {status === "error" && <div>Error :(</div>}
      {status === "idle" &&
        (pokemon ? (
          <>
            <PokemonProfile pokemon={pokemon} />
            <PokemonGames pokemon={pokemon} />
          </>
        ) : (
          <div>No pokemon selected.</div>
        ))}
    </Column>
  );
}

export default Pokemon;
