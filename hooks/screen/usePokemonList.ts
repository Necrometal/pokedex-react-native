import { useInfiniteFetchQuery, useRefreshQuery } from "@/hooks/useFetchQuery"
import { Pokemon } from "@/repositories/model/pokemon"
import { PokemonList } from "@/repositories/model/results"
import { getPokemonId } from "@/utils/pokemon"

export default function usePokemonList() {
  const path = 'pokemon?limit=21'
  const { data, refetch, ...rest } = useInfiniteFetchQuery<PokemonList>(path)
  
  const pokemons: Pokemon[] = data?.pages.flatMap((page) => page.results.map((item: Pokemon) => ({
    ...item,
    id: getPokemonId(item.url)
  }))) || []

  const {refresh} = useRefreshQuery(path, refetch)

  return {
    pokemons,
    ...rest,
    refetch: refresh
  }
} 