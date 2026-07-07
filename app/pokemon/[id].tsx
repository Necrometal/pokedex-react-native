import PokemonViewDetails from "@/components/Pokemon/ViewDetails";
import usePokemonDetail from "@/hooks/screen/usePokemonDetail";
import { useLocalSearchParams } from "expo-router";

export default function Pokemon() {
  const params = useLocalSearchParams()
  const { data, isFetching } = usePokemonDetail(parseInt((params.id as string)!))
  
  return <PokemonViewDetails  pokemon={data!} isFetching={isFetching}/>
}