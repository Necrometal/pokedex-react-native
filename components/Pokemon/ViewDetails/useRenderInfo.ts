import POKEMON_DEFAULT from "@/constants/mocks/pokemonDefault";
import { PokemonDetails } from "@/repositories/model/pokemon";

export default function useRenderInfo(pokemon?: PokemonDetails) {
    if (!pokemon) return POKEMON_DEFAULT

    return pokemon
}