// The <App /> component is responsible for rendering the two main columns
import React from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import PokemonList from "./columns/PokemonList";
import PokemonDetails from "./columns/PokemonDetails";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  return (
    <BaseStyles>
      <Flex>
        <PokemonList setSelectedPokemon={setSelectedPokemon} />
        <PokemonDetails name={selectedPokemon} />
      </Flex>
    </BaseStyles>
  );
};

// class App extends React.Component {
//   state = {
//     selectedPokemon: null
//   };

//   setSelectedPokemon = name => {
//     this.setState({
//       selectedPokemon: name
//     });
//   };

//   componentDidMount() {
//     this.updateDocumentTitle();
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.selectedPokemon !== this.state.selectedPokemon) {
//       this.updateDocumentTitle();
//     }
//   }

//   updateDocumentTitle() {
//     const { selectedPokemon } = this.state;
//     document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
//   }

//   render() {}
// }

export default App;
