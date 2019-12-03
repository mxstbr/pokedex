// Renders the sidebar with the list of pokemons in the pokedex
import React from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

class PokemonList extends React.Component {
  state = {
    pokemons: null
  };

  componentDidMount() {
    fetchPokemons().then(pokemons => {
      this.setState({
        pokemons
      });
    });
  }

  render() {
    return (
      <Sidebar>
        <Link onClick={() => this.props.setSelectedPokemon(null)}>
          <SidebarTitle>Pokedex</SidebarTitle>
        </Link>
        {!this.state.pokemons ? (
          <Spinner />
        ) : (
          this.state.pokemons.map(pokemon => (
            <Link
              key={pokemon.name}
              onClick={() => this.props.setSelectedPokemon(pokemon.name)}
            >
              <SidebarItem>{pokemon.name}</SidebarItem>
            </Link>
          ))
        )}
      </Sidebar>
    );
  }
}

export default PokemonList;
