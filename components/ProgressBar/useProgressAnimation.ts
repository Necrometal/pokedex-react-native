import { useCallback, useEffect, useRef, useState } from "react"
import { Animated, Easing, LayoutChangeEvent, View } from "react-native"
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
  const containerRef = useRef<View>(null)

  const [container, setContainer] = useState(0);

  // Mesure la largeur du container une seule fois
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const layoutWidth = event.nativeEvent.layout.width
    const width = maxValue ? calculScale(maxValue, layoutWidth) : layoutWidth;
    setContainer(width);
  }, []);

  const calculScale = (max: number, layout: number) => {
    const p =  (value * 100) / max

    return (layout * p) / 100
  }

  // Animation
  const animateProgress = useCallback(() => {
    if (container === 0) return;

    const progress = Math.min(Math.max(value, 0), 100); // clamp entre 0 et 100

    Animated.timing(widthAnim, {
      toValue: container,
      // toValue: (progress / 100) * percent,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
      delay
    }).start();
  }, [value, container, widthAnim, duration, delay]);

   // Déclenche l'animation quand la largeur est disponible + valeur change
   useEffect(() => {
    if (container > 0) {
      animateProgress();
    }
  }, [animateProgress]);

  return {
    widthAnim,
    containerRef,
    onLayout
  }
}