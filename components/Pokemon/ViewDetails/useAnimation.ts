import { Colors, ColorType } from "@/constants/colors";
import { useColorTheme } from "@/hooks/useColorTheme";
import { PokemonDetails } from "@/repositories/model/pokemon";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function usePokemonViewDetailsAnimation(pokemon: PokemonDetails) {
    const colors = useColorTheme()
    const colorType = Colors.type[pokemon.types[0].type.name as ColorType]
  
    const background = useRef(new Animated.Value(0)).current
    
    const backgroundColor = background.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.grayLight, colorType],
    })

    const animate = (value: number) => {
      Animated.timing(background, {
        toValue: value,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }
  
    useEffect(() => {
      if(pokemon) animate(1)
      else animate(0)
    }, [pokemon])

    return {
        backgroundColor,
        colorType
    }
}