import { useColorTheme } from "@/hooks/useColorTheme";
import { Animated, StyleSheet, View, ViewProps } from "react-native";
import useProgressAnimation from "./useProgressAnimation";

type Props = ViewProps & {
  height?: number,
  color?: string,
  value?: number,
  delay?: number
}

export default function ProgressBar({style, height, color, value, delay = 0, ...rest}: Props){
  const colors = useColorTheme()
  const { onLayout, widthAnim } = useProgressAnimation({ value: value ?? 0, delay })
  console.log(widthAnim)

  return (
    <View 
      style={[
        style, styles.root, 
        { 
          height: height ?? 4, 
          borderRadius: height ?? 4, 
          backgroundColor: color ?? colors.grayLight 
        }
      ]} 
      {...rest}
      onLayout={onLayout}
    >
      <Animated.View style={[
        styles.progression,
        { 
          height: height ?? 4, 
          backgroundColor: color ?? colors.grayLight,
          width: widthAnim
        }
      ]}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    opacity: 0.2,
    position: 'relative'
  },
  progression: {
    position: 'absolute',
    zIndex: 1,
    opacity: 1
  }
})