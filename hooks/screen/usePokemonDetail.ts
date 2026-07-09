import { PokemonDetails, PokemonSpecies } from "@/repositories/model/pokemon"
import { formatUrl, useFetchQuery, useRefreshQuery } from "../useFetchQuery"

export default function usePokemonDetail(id: number) {
  const path = `pokemon/[id]`
  const params = {
    id
  }

  const { refetch, ...rest } = useFetchQuery<PokemonDetails>(path, params)
  const {refresh} = useRefreshQuery(formatUrl(path, params), refetch)

  return {
    refetch: refresh,
    ...rest
  }
}

export function usePokemonSpecies(id: number) {
  const path = `pokemon-species/[id]`
  const params = {
    id
  }

  const { refetch, ...rest } = useFetchQuery<PokemonSpecies>(path, params)
  const {refresh} = useRefreshQuery(formatUrl(path, params), refetch)

  return {
    refetch: refresh,
    ...rest
  }
}