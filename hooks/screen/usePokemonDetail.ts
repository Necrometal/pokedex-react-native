import { PokemonDetails, PokemonSpecies, PokemonType } from "@/repositories/model/pokemon"
import { formatUrl, useFetchQueries, useFetchQuery, useRefreshQuery } from "../useFetchQuery"

export default function usePokemonDetail(id: number) {
  const path = `pokemon/[id]`
  const params = {
    id
  }

  const { refetch, ...rest } = useFetchQuery<PokemonDetails>(path, params)
  const {refresh} = useRefreshQuery(formatUrl(path, params), refetch)

  const results = useFetchQueries([])
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

export function usePokemonTypes(ids: number[]){
  const path = `type/[id]`
  const results = useFetchQueries<PokemonType>(ids.map((id) => formatUrl(path, {id})), ids.length > 0)

  return results
}