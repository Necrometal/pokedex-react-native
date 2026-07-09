import { useColorTheme } from "@/hooks/useColorTheme";
import { Animated, StyleSheet, View, ViewProps } from "react-native";
import useProgressAnimation from "./useProgressAnimation";

type Props = ViewProps & {
  height?: number,
  color?: string,
  value?: number,
  delay?: number,
  maxValue?: number
}

export default function ProgressBar({style, height, color, value, delay = 0, maxValue, ...rest}: Props){
  const colors = useColorTheme()
  const { onLayout, widthAnim } = useProgressAnimation({ value: value ?? 0, delay, maxValue })

  return (
    <View 
      style={[
        style, styles.root, 
        { 
          height: height ?? 4, 
        }
      ]} 
      {...rest}
      onLayout={onLayout}
    >
      <View 
        style={[
          styles.panel, 
          {
            height: height ?? 4,
            backgroundColor: color ?? colors.grayLight,
          }
        ]}
      />
      <Animated.View style={[
        styles.progression,
        { 
          height: height ?? 4, 
          backgroundColor: color ?? colors.grayLight,
          width: widthAnim
        }
      ]} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  progression: {
    position: 'absolute',
    zIndex: 1,
    opacity: 1
  },
  panel: {
    opacity: .3
  }
})