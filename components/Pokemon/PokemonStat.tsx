import { useColorTheme } from "@/hooks/useColorTheme";
import { formatNumber } from "@/utils/string";
import { StyleSheet, View, ViewProps } from "react-native";
import { Row } from "../Layout/Row";
import ProgressBar from "../ProgressBar/Index";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
  color?: string,
  name: string,
  value: number,
  index?: number
}

export function PokemonStat({ style, name, value, color, index = 0, ...rest }: Props){
  const colors = useColorTheme()

  return (
    <Row style={[style, styles.root]} {...rest}>
      <View style={[styles.statNameContainer, { borderRightColor: colors.grayLight }]}>
        <ThemedText style={[styles.statName, { color: color ?? colors.grayDark }]} variant="subtitle3">{name}</ThemedText>
      </View>
      <View style={styles.statValueContainer}>
        <Row>
          <ThemedText style={styles.statValue} variant="body3">{formatNumber(value)}</ThemedText>
          <ProgressBar delay={75 * (index + 1)} style={styles.statProgress} color={color} value={value}/>
        </Row>
      </View>
    </Row>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%'
  },
  statName: {
    width: 31,
    textAlign: 'right',
    paddingRight: 4
  },
  statValue: {
    width: 23
  },
  statNameContainer: {
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: 'solid'
  },
  statValueContainer: {
    flex: 1,
    paddingLeft: 12
  },
  statProgress: {
    flex: 1,
    marginLeft: 8
  }
})