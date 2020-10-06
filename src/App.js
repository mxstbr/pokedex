// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import { ErrorBoundary } from "react-error-boundary";
import PokemonList from "./columns/PokemonList";
import PokemonDetails from "./columns/PokemonDetails";

function App() {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  }, [selectedPokemon]);

  return (
    <BaseStyles>
      <Flex>
        <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
          <PokemonList setSelectedPokemon={setSelectedPokemon} />
        </ErrorBoundary>
        <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
          <PokemonDetails name={selectedPokemon} />
        </ErrorBoundary>
      </Flex>
    </BaseStyles>
  );
}

export default App;
