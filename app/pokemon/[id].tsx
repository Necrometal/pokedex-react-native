import PokemonPageLoader from "@/components/Pokemon/PageLoader";
import PokemonViewDetails from "@/components/Pokemon/ViewDetails";
import usePokemonDetail, { usePokemonSpecies } from "@/hooks/screen/usePokemonDetail";
import { useLocalSearchParams } from "expo-router";

export default function Pokemon() {
  const params = useLocalSearchParams()
  const { data, isPending } = usePokemonDetail(Number((params.id)!))
  const { data: species, isPending: isPendingSpecies } = usePokemonSpecies(parseInt((params.id as string)!))
  
  return isPending || isPendingSpecies 
    ? <PokemonPageLoader loading={isPending || isPendingSpecies} />
    : <PokemonViewDetails  pokemon={data} species={species!} isFetching={isPending || isPendingSpecies}/>
}