// The <App /> component is responsible for rendering the two main columns
import React, { useEffect } from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import ErrorBoundary from "react-error-boundary";
import PokemonList from "./columns/PokemonList";
import createResource from "./create-resource";
import { fetchPokemonByName } from "./api/pokeapi";

const PokemonDetails = React.lazy(() =>
  import("./columns/PokemonDetails" /* webpackChunkName: "PokemonDetails" */)
);

const App = () => {
  const [pokemonResource, setPokemonResource] = React.useState(null);

  const setSelectedPokemon = name => {
    document.title = `${name ? `${name} | ` : ""}Pokedex`;
    setPokemonResource(createResource(fetchPokemonByName(name)));
  };

  return (
    <BaseStyles>
      <Flex>
        <ErrorBoundary FallbackComponent={() => <div>Oops</div>}>
          <React.Suspense fallback={<Spinner />}>
            <PokemonList setSelectedPokemon={setSelectedPokemon} />
          </React.Suspense>
        </ErrorBoundary>
        {pokemonResource && (
          <React.Suspense fallback={<Spinner />}>
            <PokemonDetails pokemonResource={pokemonResource} />
          </React.Suspense>
        )}
      </Flex>
    </BaseStyles>
  );
};
export default App;
