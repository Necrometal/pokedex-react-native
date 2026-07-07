import { PokemonDetails } from "@/repositories/model/pokemon"
import { useFetchQuery, useRefreshQuery } from "../useFetchQuery"

export default function usePokemonDetail(id: number) {
  const path = `pokemon/${id}`

  const { refetch, ...rest } = useFetchQuery<PokemonDetails>(path)
  const {refresh} = useRefreshQuery(path, refetch)

  return {
    refetch: refresh,
    ...rest
  }
}