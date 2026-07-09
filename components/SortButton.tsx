import { Shadows } from "@/constants/shadows"
import { useColorTheme } from "@/hooks/useColorTheme"
import { type Pokemon } from "@/repositories/model/pokemon"
import { getFontSize } from "@/utils/responsive"
import { createCallable } from 'react-call'
import { Image, Modal, Pressable, StyleSheet, TouchableHighlight, View } from "react-native"
import { Card } from "./Card"
import { Radio } from "./Form/Radio"
import { Row } from "./Layout/Row"
import { ThemedText } from "./ThemedText"

export const SORT_VALUE = {
  id: "id",
  name: "name"
} as const satisfies Record<string, keyof Pokemon>

export type SortType = typeof SORT_VALUE.id| typeof SORT_VALUE.name

type Props = {
  value: SortType,
  onChange: (value: SortType) => void
}

type SortDialogType = {
  value: SortType,
}

const options = [
  { label: "Number", value: SORT_VALUE.id },
  { label: "Name", value: SORT_VALUE.name }
]

export default function SortButton({value, onChange}: Props) {
  const onPress = async () => {
    const response = await SortDialog.call({ value })
    if(response) onChange(response)
    // onChange(value === SORT_VALUE.id ? SORT_VALUE.name : SORT_VALUE.id)
  }
  return (
    <View>
      <TouchableHighlight 
        style={[styles.button, Shadows.innerShadow]} 
        underlayColor="transparent" 
        onPress={onPress}
      >
        <View>
          {
            value === SORT_VALUE.id 
            ? <Image source={require('@/assets/images/sort.png')} style={styles.icon}/>
            : <Image source={require('@/assets/images/text_format.png')} style={styles.icon}/>
          }
        </View>
      </TouchableHighlight>
      <SortDialog />
    </View>
  )
}

export const SortDialog = createCallable<SortDialogType, SortType | null>(({
  value,
  call
}) => {
  const colors = useColorTheme()
  const onChange = (v: SortType) => {
    call.end(v)
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible
    >
      <Pressable style={styles.backdrop} onPress={() => call.end(null)}/>
      <View style={[styles.popup, { backgroundColor: colors.tint }]}>
        <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
          Sort by:
        </ThemedText>
        <Card style={styles.card}>
          {
            options.map(o => (
              <Pressable 
                key={o.value} 
                onPress={() => onChange(o.value)} 
                android_ripple={{ color: 'rgba(150, 150, 150, 0.36)', foreground: true }}
                style={styles.optionItem}
              >
                <Row gap={8}>
                  <Radio checked={o.value === value}/>
                  <ThemedText>{o.label}</ThemedText>
                </Row>
              </Pressable>
            ))
          }
        </Card>
      </View>
    </Modal>
  )
})

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
  },
  popup: {
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  title: {
    paddingLeft: 20
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 2
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 4
  }
})