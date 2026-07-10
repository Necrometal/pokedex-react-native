import PokemonViewDetails from "@/components/Pokemon/ViewDetails";
import useRenderInfo from "@/components/Pokemon/ViewDetails/useRenderInfo";
import usePokemonDetail, { usePokemonSpecies } from "@/hooks/screen/usePokemonDetail";
import { useLocalSearchParams } from "expo-router";

export default function Pokemon() {
  const params = useLocalSearchParams()
  const { data, isPending } = usePokemonDetail(Number((params.id)!))
  const { data: species, isPending: isPendingSpecies } = usePokemonSpecies(Number((params.id)!))

  const pokemon = useRenderInfo(data)
  // const results = usePokemonTypes(pokemon.types.map((t) => getPokemonId(t.type.url)))

  // const isLoadingTypes = results.some(q => q.isPending);
  // const types = results.map((r) => r.data)
  
  // return isPending || isPendingSpecies
    // ? <PokemonPageLoader loading={isPending || isPendingSpecies} />
  return <PokemonViewDetails  
        pokemon={pokemon} 
        species={species}
        isFetching={isPending || isPendingSpecies}
      />
}