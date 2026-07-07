import { Pokemon } from "./pokemon";

export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}