// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import { ErrorBoundary } from "react-error-boundary";
import PokemonList from "./columns/PokemonList";
// import PokemonDetails from "./columns/PokemonDetails";

const AsyncLoadPokemonDetails = React.lazy(() =>
  import(`./columns/PokemonDetails` /* webpackChunkName: "PokemonDetails" */)
);

function App() {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  }, [selectedPokemon]);

  return (
    <BaseStyles>
      <Flex>
        <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
          <React.Suspense fallback={<Spinner />}>
            <PokemonList setSelectedPokemon={setSelectedPokemon} />
          </React.Suspense>
        </ErrorBoundary>
        {selectedPokemon ? (
          <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
            <React.Suspense fallback={<Spinner />}>
              <AsyncLoadPokemonDetails name={selectedPokemon} />
            </React.Suspense>
          </ErrorBoundary>
        ) : (
          <p>No selected pokemon.</p>
        )}
      </Flex>
    </BaseStyles>
  );
}

export default App;
