import { Card } from "@/components/Card";
import { RootView } from "@/components/Layout/RootView";
import { Row } from "@/components/Layout/Row";
import { ThemedText } from "@/components/ThemedText";
import { ColorType } from "@/constants/colors";
import { COUNT_POKEMON, STAT_NAME } from "@/constants/pokemon";
import { useColorTheme } from "@/hooks/useColorTheme";
import { FlavorText, PokemonDetails, PokemonSpecies } from "@/repositories/model/pokemon";
import { formatWeight, getPokemonArtWork } from "@/utils/pokemon";
import { capitalizeFirstLetter, cleanText } from "@/utils/string";
import { useAudioPlayer } from 'expo-audio';
import { router } from "expo-router";
import { Animated, Image, Pressable, View, ViewProps } from "react-native";
import PokemonSpec from "../PokemonSpec";
import { PokemonStat } from "../PokemonStat";
import PokemonType from "../PokemonType";
import Header from "./Header";
import { styles } from "./style";
import usePokemonViewDetailsAnimation from "./useAnimation";

type Props = ViewProps & {
  pokemon: PokemonDetails;
  isFetching: boolean;
  species?: PokemonSpecies,
  // types: TypesPokemon[]
}

export default function PokemonViewDetails({pokemon, species}: Props){
  const {backgroundColor, colorType} = usePokemonViewDetailsAnimation(pokemon)
  const colors = useColorTheme()
  const bio = species?.flavor_text_entries?.find(({ language }: FlavorText) => language.name === 'en')
  const cry =  pokemon.cries.latest
  const player = useAudioPlayer(cry);

  const onImagePress = () => {
    if(!cry) return
    play()
  }

  const play = () => {
    player.seekTo(0);
    player.play();
  }

  const prevPokemon = () => {
    router.replace({ pathname: '/pokemon/[id]', params: { id: pokemon.id - 1 } })
  }

  const nextPokemon = () => {
    router.replace({ pathname: '/pokemon/[id]', params: { id: pokemon.id + 1 } })
  }

  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <RootView>
        <View>
          <Image source={require('@/assets/images/big_pokeball.png')} style={styles.backgroundIcon}/>
          <Header pokeName={capitalizeFirstLetter(pokemon.name)} pokeId={String(pokemon.id).padStart(3, '0')}/>
          <View style={styles.body}>
            <Row style={styles.imagePokemon}>
              {
                pokemon.id > 1 && (
                  <Pressable onPress={prevPokemon}>
                    <Image 
                      source={require('@/assets/images/chevron_left.png')} 
                      style={styles.navigationBtn}
                    />
                  </Pressable>
                )
              }
              <Pressable onPress={onImagePress}>
                <Image 
                  source={pokemon.id ? {uri: getPokemonArtWork(pokemon.id)} : require('@/assets/images/Silhouette.png')} 
                  style={styles.picture}
                />
              </Pressable>
              {
                pokemon.id < COUNT_POKEMON && (
                  <Pressable onPress={nextPokemon}>
                    <Image 
                      source={require('@/assets/images/chevron_right.png')} 
                      style={styles.navigationBtn}
                    />
                  </Pressable>
                )
              }
            </Row>
            <Card style={styles.card}>
              <Row gap={16}>
                {
                  pokemon.types.map(t => (
                    <PokemonType key={`type-${t.type.name}`} type={t.type.name as ColorType}/>
                  ))
                }
              </Row>
              <ThemedText variant="subtitle1" style={[styles.subtitle, { color: colorType }]}>
                About
              </ThemedText>
              <Row style={{ marginBottom: 8}}>
                <PokemonSpec style={[styles.about, { borderRightWidth: 1, borderColor: colors.grayLight }]} image={require('@/assets/images/weight.png')} title={formatWeight(pokemon.weight)} description="Weight"/>
                <PokemonSpec style={[styles.about, { borderRightWidth: 1, borderColor: colors.grayLight }]} image={require('@/assets/images/straighten_2.png')} title={`${pokemon.height} m`} description="Height"/>
                <PokemonSpec 
                  style={styles.about} 
                  title={pokemon.moves.slice(0, 2).map((m) => capitalizeFirstLetter(m.move.name)).join("\n")}
                  description="Moves"
                />
              </Row>

              <ThemedText style={styles.flavor} color="grayDark" variant="body3">
                { bio ? cleanText(bio.flavor_text) : 'unknown' }
              </ThemedText>
              
              <ThemedText variant="subtitle1" style={[styles.subtitle, { color: colorType }]}>
                Base stats
              </ThemedText>

              <View>
                {
                  pokemon.stats.map((stat, i) => (
                    <PokemonStat index={i} key={`stat-${stat.stat.name}`} color={colorType} name={STAT_NAME[stat.stat.name as keyof typeof STAT_NAME]} value={stat.base_stat}/>
                  ))
                }
              </View>
            </Card>
          </View>
        </View>
      </RootView>
    </Animated.View>
  )
}
