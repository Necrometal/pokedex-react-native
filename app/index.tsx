import { Card } from '@/components/Card';
import SearchBar from '@/components/Form/SearchBar';
import { RootView } from '@/components/Layout/RootView';
import { Row } from '@/components/Layout/Row';
import PokemonCardListItem from '@/components/Pokemon/CardListItem';
import SortButton, { SORT_VALUE, SortType } from '@/components/SortButton';
import { ThemedText } from '@/components/ThemedText';
import usePokemonList from '@/hooks/screen/usePokemonList';
import { useColorTheme } from "@/hooks/useColorTheme";
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View, useWindowDimensions } from "react-native";

export default function Index() {
  const colors = useColorTheme()
  const { width } = useWindowDimensions();
  const itemWidth = (width - 48) / 3;

  const { pokemons, isFetching, fetchNextPage, refetch } = usePokemonList()
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortType>(SORT_VALUE.id)

  const filteredPokemons = [
    ...(search 
      ? pokemons.filter((p) => p.name.includes(search.toLocaleLowerCase()) || p.id.toString() === search)
      : pokemons)
  ].sort((a, b) => a[sortKey] < b[sortKey] ? -1 : 1)
  
  const onChange = (s: string) => {
    setSearch(s)
  }

  return (
    <RootView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
        <Row style={styles.headerTitle}>
          <Image source={require('@/assets/images/pokeball.png')} style={styles.headerIcon}/>
          <ThemedText color="grayWhite" variant="headline" >Pokédex</ThemedText>
        </Row>
        <Row gap={8}>
          <SearchBar value={search} onChange={onChange} style={styles.search}/>
          <SortButton value={sortKey} onChange={setSortKey}/>
        </Row>
      </View>

      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons }
          renderItem={({item}) => (
            <PokemonCardListItem 
              item={{ id: item.id, name: item.name }} 
              style={[{ width: itemWidth, height: itemWidth - 4 }]} 
            />
          )}
          numColumns={3}
          keyExtractor={(item) => `${item.id}`}
          columnWrapperStyle={styles.grid}
          contentContainerStyle={[styles.grid, styles.list]}
          onEndReached={search ? undefined : () => fetchNextPage()}
          onRefresh={() => refetch()}
          refreshing={isFetching}
          onStartReachedThreshold={2}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    paddingTop: 4
  },
  header: {
    padding: 12
  },
  headerTitle :{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: { 
    width: 24, 
    height: 24,
    aspectRatio: 4/4
  },
  body: {
    flex: 1,
  },
  grid: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
  search: {
    flex: 1
  }
})
