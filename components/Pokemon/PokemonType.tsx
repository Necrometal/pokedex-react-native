import { Colors, ColorType } from "@/constants/colors"
import { capitalizeFirstLetter } from "@/utils/string"
import { View, ViewStyle } from "react-native"
import { ThemedText } from "../ThemedText"

type Props = {
  type: ColorType
}

export default function PokemonType({ type }: Props){
  const label = capitalizeFirstLetter(type)
  const backgroundColor = Colors.type[type]
  
  return (
    <View style={[styles, { backgroundColor }]}>
      <ThemedText color="grayWhite" variant="subtitle3">
        {label}
      </ThemedText>
    </View>
  )
}

const styles = {
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 10
} satisfies ViewStyle