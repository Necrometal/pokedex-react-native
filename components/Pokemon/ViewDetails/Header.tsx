import { Row } from "@/components/Layout/Row";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, ViewProps } from "react-native";

type Props = ViewProps & {
  pokeName: string;
  pokeId: string;
}

export default function Header({pokeName, pokeId} :Props) {
  const goBack = () => {
    router.back()
  }
  return (
    <Row style={[styles.header]}>
      <Pressable onPress={goBack}>
        <Row style={styles.headerLeft}>
          <Image width={20.53} height={20.53} style={styles.arrow} source={require('@/assets/images/arrow_back.png')} />
          <ThemedText color="grayWhite" variant="headline">{pokeName}</ThemedText>
        </Row>
      </Pressable>
      <ThemedText color="grayWhite" variant="subtitle2">#{pokeId}</ThemedText>
    </Row>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24
  },
  headerLeft: {
    gap: 8
  },
  arrow: {
    tintColor: 'white',
    width: 30,
    height: 30
  }
})