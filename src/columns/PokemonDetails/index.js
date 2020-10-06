// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../use-async";

class PokemonGames extends React.Component {
  state = {
    games: null
  };

  componentDidMount() {
    this.fetchGames();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.pokemon && this.props.pokemon) ||
      prevProps.pokemon.name !== this.props.pokemon.name
    ) {
      this.fetchGames();
    }
  }

  fetchGames() {
    this.setState({
      games: null
    });

    if (!this.props.pokemon) return;
    fetchPokemonGames(
      this.props.pokemon.game_indices.map(game => game.version.name)
    ).then(games => {
      this.setState({
        games
      });
    });
  }

  render() {
    return !this.state.games ? (
      <Spinner />
    ) : (
      <PokemonGamesSection games={this.state.games} />
    );
  }
}

function Pokemon(props) {
  const data = props.resource.read();

  return (
    <Column width={1} p={4}>
      {data ? (
        <>
          <PokemonProfile pokemon={data} />
          <PokemonGames pokemon={data} />
        </>
      ) : (
        <div>No pokemon selected</div>
      )}
    </Column>
  );
}

export default Pokemon;
