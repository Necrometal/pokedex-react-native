import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native"
import { Row } from "../Layout/Row"
import { ThemedText } from "../ThemedText"

type Props = ViewProps & {
  title: string,
  description: string,
  image?: ImageSourcePropType
}

export default function PokemonSpec({ style, image, title, description, ...rest }: Props){
  return (
    <View style={[style, styles.root]} {...rest}>
      <Row style={styles.row} gap={8}>
        { image && <Image source={image} style={[styles.image]}/> }
        <ThemedText color="grayDark" variant="body3">{title}</ThemedText>
      </Row>
      <ThemedText style={styles.description} color="grayMedium" variant="caption">{description}</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    gap: 4
  },
  image: {
    width: 16,
    height: 16
  },
  row: {
    height: 32
  },
  description: {

  }
})