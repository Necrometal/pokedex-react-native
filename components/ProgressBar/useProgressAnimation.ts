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

  const [percent, setPercent] = useState(0);

  // Mesure la largeur du container une seule fois
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const width = maxValue ?? event.nativeEvent.layout.width;
    setPercent(width);
  }, []);

  // Animation
  const animateProgress = useCallback(() => {
    if (percent === 0) return;

    const progress = Math.min(Math.max(value, 0), 100); // clamp entre 0 et 100

    Animated.timing(widthAnim, {
      toValue: (progress / 100) * percent,
      duration: duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
      delay
    }).start();
  }, [value, percent, widthAnim, duration, delay]);

   // Déclenche l'animation quand la largeur est disponible + valeur change
   useEffect(() => {
    if (percent > 0) {
      animateProgress();
    }
  }, [animateProgress]);

  return {
    widthAnim,
    containerRef,
    onLayout
  }
}