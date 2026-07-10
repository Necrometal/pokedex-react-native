import { styles } from '@/components/ThemedText/style'
import { Colors } from '@/constants/colors'
import { useColorTheme } from '@/hooks/useColorTheme'
import { Text, type TextProps } from "react-native"

type Props = TextProps & {
  variant?: keyof typeof styles,
  color?: keyof typeof Colors['light']
}

export function ThemedText ({
  variant,
  color,
  style,
  ...rest
}: Props) {
  const colors = useColorTheme()
  
  return <Text 
    style={[
      {color: colors[color ?? 'grayDark']},
      style,
      styles[variant ?? 'body3'],
    ]} 
    {...rest}
  />
}

