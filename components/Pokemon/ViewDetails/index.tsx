import { RootView } from "@/components/Layout/RootView";
import { PokemonDetails } from "@/repositories/model/pokemon";
import { capitalizeFirstLetter } from "@/utils/string";
import { Animated, StyleSheet, ViewProps } from "react-native";
import Header from "./Header";
import usePokemonViewDetailsAnimation from "./useAnimation";
import useRenderInfo from "./useRenderInfo";

type Props = ViewProps & {
  pokemon?: PokemonDetails;
  isFetching: boolean;
}

export default function PokemonViewDetails({pokemon, isFetching}: Props){

  const {backgroundColor} = usePokemonViewDetailsAnimation(pokemon)
  const renderInfo = useRenderInfo(pokemon)
  
  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <RootView>
        <Header pokeName={capitalizeFirstLetter(renderInfo.name)} pokeId={String(renderInfo.id).padStart(3, '0')}/>
      </RootView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
