import { ThemedText } from '@/components/ThemedText';
import { OFFICIAL_ARTWORK_PATH } from "@/constants/path";
import { useColorTheme } from '@/hooks/useColorTheme';
import { capitalizeFirstLetter } from '@/utils/string';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import { Card } from "../Card";

type Props = ViewProps & {
  item: {
    id: number,
    name: string
  }
}

export default function PokemonCardListItem({item, style, ...props}: Props) {
  const colors = useColorTheme()  

  return (
    <Link href={{pathname: '/pokemon/[id]', params: {id: item.id}}} asChild>
      <Pressable style={[style]} {...props}>
        <Card style={[styles.item, style]} {...props}>
          <View style={[styles.shadow, { backgroundColor: colors.graybackground }]} />
          <ThemedText style={styles.id} color="grayDark" variant='caption'>#{item.id}</ThemedText>
          <Image 
            source={{uri: `${OFFICIAL_ARTWORK_PATH}${item.id}.png`}} 
            style={styles.picture}
          />
          <ThemedText variant='body3'>{capitalizeFirstLetter(item.name)}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    alignItems: 'center',
    padding: 4,
    justifyContent: 'space-between',
  },
  id: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 0,
  },
  shadow: {
    height: '44%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 7,
  },
  picture: {
    width: 72,
    height: 72,
    aspectRatio: 10/9
  }
})