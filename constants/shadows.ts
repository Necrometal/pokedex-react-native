import { ViewStyle } from "react-native";

export const Shadows = {
  dp2: {
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2
  },
  innerShadow: {
    boxShadow: [{
      offsetX: 0,
      offsetY: 4,
      blurRadius: 10,
      spreadDistance: -2,
      color: '#00000040',
      inset: true,
    }]
  }
} satisfies Record<string, ViewStyle>