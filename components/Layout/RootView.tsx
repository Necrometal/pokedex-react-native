import { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = ViewProps

export function RootView({ style, ...rest }: Props) {
    return <SafeAreaView style={[rootStyle, style]} {...rest}/>
}

const rootStyle = {
  flex: 1,
  paddingHorizontal: 4,
  paddingTop: 4,
  position: 'relative'
} satisfies ViewStyle