import { useCallback, useEffect, useRef, useState } from "react"
import { Animated, Easing, LayoutChangeEvent } from "react-native"

type progressValue = {
  value: number,
  maxValue?: number,
  duration?: number // millisec,
  delay?: number
}

export default function useProgressAnimation({
  value,
  duration = 500,
  delay = 0,
  maxValue
}: progressValue) {
  const widthAnim = useRef(new Animated.Value(0)).current
  const [layoutWidth, setLayoutWidth] = useState(0)

  // Mesure la largeur du progression une seule fois
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    if (width > 0) {
      setLayoutWidth(width)
    }
  }, [])


  const calculScale = ((layout: number, max?: number) => {
    if(max){
      const p = (value * 100) / max
      return (layout * p) / 100
    }
    return value * (layout / 100)
  })

  const progression = layoutWidth > 0
    ? calculScale(layoutWidth, maxValue)
    : 0

  const animateProgress = useCallback(() => {
    if (progression <= 0) return

    Animated.timing(widthAnim, {
      toValue: progression,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
      delay
    }).start()
  }, [progression, duration, delay, widthAnim])

  useEffect(() => {
    widthAnim.setValue(0)
  }, [value, widthAnim])

  useEffect(() => {
    if (progression > 0) {
      animateProgress()
    }
  }, [progression, animateProgress])

  return {
    widthAnim,
    onLayout,
  }
}