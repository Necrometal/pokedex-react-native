import { Shadows } from "@/constants/shadows"
import { type Pokemon } from "@/repositories/model/pokemon"
import { getFontSize } from "@/utils/responsive"
import { Image, StyleSheet, TouchableHighlight, View } from "react-native"

export const SORT_VALUE = {
  id: "id",
  name: "name"
} as const satisfies Record<string, keyof Pokemon>

export type SortType = typeof SORT_VALUE.id| typeof SORT_VALUE.name

type Props = {
  value: SortType,
  onChange: (value: SortType) => void
}

export default function SortButton({value, onChange}: Props) {
  return (
    <TouchableHighlight style={[styles.button, Shadows.innerShadow]} underlayColor="transparent" onPress={() => onChange(value === SORT_VALUE.id ? SORT_VALUE.name : SORT_VALUE.id)}>
      <View>
        {
          value === SORT_VALUE.id 
          ? <Image source={require('@/assets/images/sort.png')} style={styles.icon}/>
          : <Image source={require('@/assets/images/text_format.png')} style={styles.icon}/>
        }
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: getFontSize(16),
    height: getFontSize(16)
  },
  button: {
    borderRadius: 50,
    backgroundColor: 'white',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  }
})