// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import { Spinner } from "@nice-boys/components";
import ErrorBoundary from "react-error-boundary";
import { fetchPokemonByName } from "./api/pokeapi";

const PokemonDetails = React.lazy(() =>
  import("./columns/PokemonDetails" /* webpackChunkName: "PokemonDetails" */)
);

const createResource = promise => {
  let status = "loading";
  let data = null;
  let error = null;

  promise.then(
    result => {
      status = "complete";
      data = result;
    },
    err => {
      status = "errored";
      error = err;
    }
  );

  return {
    read() {
      if (status === "complete") return data;
      if (status === "errored") throw error;
      throw promise;
    }
  };
};

function App() {
  const [selectedPokemon, setStateSelectedPokemon] = React.useState(null);
  const [pokemonResource, setPokemonResource] = React.useState(
    createResource(Promise.resolve(null))
  );

  React.useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  });

  const setSelectedPokemon = name => {
    setStateSelectedPokemon(name);
    setPokemonResource(createResource(fetchPokemonByName(name)));
  };

  return (
    <BaseStyles>
      <Flex>
        <React.Suspense fallback={<Spinner></Spinner>}>
          <ErrorBoundary FallbackComponent={() => <div>Error :(</div>}>
            <PokemonList setSelectedPokemon={setSelectedPokemon} />
          </ErrorBoundary>
        </React.Suspense>
        {selectedPokemon ? (
          <React.Suspense fallback={<Spinner />}>
            <PokemonDetails resource={pokemonResource} />
          </React.Suspense>
        ) : (
          <div>No pokemon selected.</div>
        )}
      </Flex>
    </BaseStyles>
  );
}

export default App;
