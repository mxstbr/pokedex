// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

function reducer(state, action) {
  switch (action.type) {
    case "start": {
      return {
        data: null,
        error: null,
        status: "loading"
      };
    }
    case "complete": {
      return {
        data: action.data,
        error: null,
        status: "idle"
      };
    }
    case "error": {
      return {
        data: null,
        error: action.error,
        status: "error"
      };
    }
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

function useAsync(fn) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: "idle",
    data: null,
    error: null
  });

  React.useEffect(() => {
    let cancelled = false;

    dispatch({ type: "start" });
    fn().then(
      data => {
        if (cancelled) return;
        dispatch({ type: "complete", data });
      },
      error => {
        if (cancelled) return;
        dispatch({ type: "error", error });
      }
    );

    return () => {
      cancelled = true;
    };
  }, [fn]);

  return state;
}

function PokemonGames(props) {
  const callback = React.useCallback(
    () =>
      fetchPokemonGames(
        props.pokemon.game_indices.map(game => game.version.name)
      ),
    [props.pokemon]
  );

  const { data: games } = useAsync(callback);

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
