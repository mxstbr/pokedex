// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import PokemonDetails from "./columns/PokemonDetails";

function App() {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  React.useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  });

  return (
    <BaseStyles>
      <Flex>
        <PokemonList setSelectedPokemon={setSelectedPokemon} />
        <PokemonDetails name={selectedPokemon} />
      </Flex>
    </BaseStyles>
  );
}

export default App;
