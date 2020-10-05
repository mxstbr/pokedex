// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

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
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    setPokemon(null);

    if (!props.name) return;
    fetchPokemonByName(props.name).then(pokemon => {
      setPokemon(pokemon);
    });
  }, [props.name]);

  return (
    <Column width={1} p={4}>
      {!props.name ? null : !pokemon ? (
        <Spinner />
      ) : (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      )}
    </Column>
  );
}

export default Pokemon;
