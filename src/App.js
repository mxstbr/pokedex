// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import { Spinner } from "@nice-boys/components";
import createResource from "./resource";
import { fetchPokemonByName } from "./api/pokeapi";
const PokemonDetails = React.lazy(() =>
  import("./columns/PokemonDetails" /* webpackChunkName: "PokemonDetails" */)
);

const App = () => {
  const [selectedPokemon, setStateSelectedPokemon] = React.useState(null);
  const [selectedPokemonResource, setSelectedPokemonResource] = React.useState(
    createResource(Promise.resolve(null))
  );

  const setSelectedPokemon = name => {
    setStateSelectedPokemon(name);
    setSelectedPokemonResource(createResource(fetchPokemonByName(name)));
  };

  React.useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  });

  return (
    <BaseStyles>
      <Flex>
        <React.Suspense fallback={<Spinner />}>
          <PokemonList setSelectedPokemon={setSelectedPokemon} />
        </React.Suspense>
        {selectedPokemon && (
          <React.Suspense fallback={<Spinner />}>
            <PokemonDetails resource={selectedPokemonResource} />
          </React.Suspense>
        )}
      </Flex>
    </BaseStyles>
  );
};

export default App;
