// Data fetching methods for the PokeAPI with additional random delay
import { Pokedex } from "pokeapi-js-wrapper";

// ⚠️ Note that the pokeapi-js-wrapper package caches data in IndexedDB, so if you remove
// all delay the data will resolve instantly after you have fetched it once. ⚠️
const MIN_DELAY_MS = 100;
const MAX_DELAY_MS = 2000;

const P = new Pokedex();

const delay = ms => new Promise(res => setTimeout(res, ms));
const randomDelay = () =>
  delay(MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS));

export const fetchPokemons = async (offset = 0) => {
  await randomDelay();
  return P.getPokemonsList({ offset, limit: 20 }).then(res => res.results);
};

export const fetchPokemonByName = async name => {
  await randomDelay();
  return P.getPokemonByName(name);
};

export const fetchPokemonGames = async names => {
  await randomDelay();
  return Promise.all(names.map(name => P.getVersionByName(name)));
};
