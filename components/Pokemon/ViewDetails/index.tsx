import { ThemedText } from "@/components/ThemedText";
import { useColorTheme } from "@/hooks/useColorTheme";
import { PokemonDetails } from "@/repositories/model/pokemon";
import { capitalizeFirstLetter } from "@/utils/string";
import { router } from "expo-router";
import { Animated, Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usePokemonViewDetailsAnimation from "./useAnimation";
import useRenderInfo from "./useRenderInfo";

type Props = ViewProps & {
  pokemon?: PokemonDetails;
  isFetching: boolean;
}

export default function PokemonViewDetails({pokemon}: Props){
  const colors = useColorTheme()

  const {backgroundColor} = usePokemonViewDetailsAnimation(pokemon)
  const renderInfo = useRenderInfo(pokemon)

  const goBack = () => {
    router.back()
  }
  
  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.header]}>
          <View style={styles.headerLeft}>
            <Pressable onPress={goBack}>
              <Image width={20.53} height={20.53} style={styles.arrow} source={require('@/assets/images/arrow_back.png')} />
            </Pressable>
            <ThemedText color="grayWhite" variant="headline">{capitalizeFirstLetter(renderInfo.name)}</ThemedText>
          </View>
          <ThemedText color="grayWhite" variant="subtitle2">#{String(renderInfo.id).padStart(3, '0')}</ThemedText>
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  arrow: {
    tintColor: 'white',
    width: 30,
    height: 30
  }
})
