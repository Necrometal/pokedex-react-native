import { Colors } from "@/constants/colors"
import { useColorScheme } from "react-native"

export const useColorTheme = () => {
    const theme = useColorScheme() ?? 'light'
    return Colors[theme]
}