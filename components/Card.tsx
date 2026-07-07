import { Shadows } from "@/constants/shadows";
import { useColorTheme } from "@/hooks/useColorTheme";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {

}

export function Card({style, ...rest}: Props) {
  const colors = useColorTheme()
  
  return <View 
    {...rest}
    style={[style, styles, {backgroundColor: colors.grayWhite}]}
  />
}

const styles = {
  borderRadius: 8,
  ...Shadows.dp2
} satisfies ViewStyle