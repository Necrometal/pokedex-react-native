import { useColorTheme } from "@/hooks/useColorTheme";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

type Props = {
  loading: boolean;
}

export default function PokemonPageLoader({loading}: Props){
  const colors = useColorTheme()

  // used for animation loader
  const opacity = useRef(new Animated.Value(0.2)).current
  // used for animation fading
  const fade = useRef(new Animated.Value(1)).current

  const viewOpacity = fade.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    )

    animation.start()

    return () => animation.stop()
  }, [])

  useEffect(() => {
    if (!loading) {
      Animated.timing(fade, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start()

      
    } else {
      fade.setValue(1)
    }
  }, [loading])
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        {
          opacity: viewOpacity
        }
      ]}
    >
      <View style={styles.image}>
        <Animated.Image 
          source={require('@/assets/images/Silhouette.png')} 
          width={24} 
          height={24}
          style={{opacity}}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'white',
    borderRadius: 200,
    padding: 10
  }
})