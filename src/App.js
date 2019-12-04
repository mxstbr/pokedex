// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import { Spinner } from "@nice-boys/components";
import ErrorBoundary from "react-error-boundary";

const PokemonDetails = React.lazy(() =>
  import("./columns/PokemonDetails" /* webpackChunkName: "PokemonDetails" */)
);

function App() {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  });

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
            <PokemonDetails name={selectedPokemon} />
          </React.Suspense>
        ) : (
          <div>No pokemon selected.</div>
        )}
      </Flex>
    </BaseStyles>
  );
}

export default App;
