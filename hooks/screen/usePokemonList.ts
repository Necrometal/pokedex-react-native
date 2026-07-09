import { useInfiniteFetchQuery, useRefreshQuery } from "@/hooks/useFetchQuery"
import { Pokemon } from "@/repositories/model/pokemon"
import { PokemonList } from "@/repositories/model/results"
import { getPokemonId } from "@/utils/pokemon"
import { useState } from "react"

export default function usePokemonList() {
  const PATH_POKEMON_LIST = 'pokemon?limit=21'
  // useState for futur dynamic filter
  const [path, setPath] = useState(PATH_POKEMON_LIST)
  const { data, refetch, ...rest } = useInfiniteFetchQuery<PokemonList>(path)
  
  const pokemons: Pokemon[] = data?.pages.flatMap((page) => page.results.map((item: Pokemon) => ({
    ...item,
    id: getPokemonId(item.url)
  }))) || []

  const {refresh} = useRefreshQuery(path, refetch)

  const handleFilter = (filter: string) => {
    // TODO: (feature) Implement filter
  }

  return {
    pokemons,
    ...rest,
    refetch: refresh,
    handleFilter
  }
} 