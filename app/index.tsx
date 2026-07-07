import { Card } from '@/components/Card';
import PokemonCardListItem from '@/components/Pokemon/CardListItem';
import { ThemedText } from '@/components/ThemedText';
import usePokemonList from '@/hooks/screen/usePokemonList';
import { useColorTheme } from "@/hooks/useColorTheme";
import { FlatList, Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useColorTheme()
  const { width } = useWindowDimensions();
  const itemWidth = (width - 48) / 3;

  const { pokemons, isFetching, fetchNextPage, refetch } = usePokemonList()

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/pokeball.png')} width={24} height={24}/>
        <ThemedText color="grayWhite" variant="headline" >Pokédex {pokemons.length}</ThemedText>
      </View>

      <Card style={styles.body}>
        <FlatList
          data={pokemons}
          renderItem={({item}) => (
            <PokemonCardListItem item={item} style={[styles.item, { width: itemWidth, height: itemWidth - 4 }]} />
          )}
          numColumns={3}
          keyExtractor={(item) => `${item.id}`}
          columnWrapperStyle={styles.grid}
          contentContainerStyle={[styles.grid, styles.list]}
          onEndReached={() => fetchNextPage()}
          onRefresh={() => refetch()}
          refreshing={isFetching}
          onStartReachedThreshold={2}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    paddingTop: 4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12
  },
  body: {
    flex: 1,
  },
  item: {
  },
  grid: {
    gap: 8,
  },
  list: {
    padding: 12,
  }
})
