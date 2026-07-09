import { Card } from "@/components/Card";
import { RootView } from "@/components/Layout/RootView";
import { Row } from "@/components/Layout/Row";
import { ThemedText } from "@/components/ThemedText";
import { ColorType } from "@/constants/colors";
import { useColorTheme } from "@/hooks/useColorTheme";
import { FlavorText, PokemonDetails, PokemonSpecies } from "@/repositories/model/pokemon";
import { formatWeight, getPokemonArtWork } from "@/utils/pokemon";
import { capitalizeFirstLetter, cleanText } from "@/utils/string";
import { Animated, Image, View, ViewProps } from "react-native";
import PokemonSpec from "../PokemonSpec";
import PokemonType from "../PokemonType";
import Header from "./Header";
import { styles } from "./style";
import usePokemonViewDetailsAnimation from "./useAnimation";
import useRenderInfo from "./useRenderInfo";

type Props = ViewProps & {
  pokemon?: PokemonDetails;
  isFetching: boolean;
  species: PokemonSpecies
}

export default function PokemonViewDetails({pokemon, species}: Props){

  const data = useRenderInfo(pokemon)
  const {backgroundColor, colorType} = usePokemonViewDetailsAnimation(data)
  const colors = useColorTheme()
  const bio = species.flavor_text_entries?.find(({ language }: FlavorText) => language.name === 'en')

  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <RootView>
        <View>
          <Image source={require('@/assets/images/big_pokeball.png')} style={styles.backgroundIcon}/>
          <Header pokeName={capitalizeFirstLetter(data.name)} pokeId={String(data.id).padStart(3, '0')}/>
          <View style={styles.body}>
            <Image 
              source={pokemon ? {uri: getPokemonArtWork(pokemon.id)} : require('@/assets/images/Silhouette.png')} 
              style={styles.picture}
            />
            <Card style={styles.card}>
              <Row gap={16}>
                {
                  data.types.map(t => (
                    <PokemonType key={`type-${t.type.name}`} type={t.type.name as ColorType}/>
                  ))
                }
              </Row>
              <ThemedText variant="subtitle1" style={[styles.subtitle, { color: colorType }]}>
                About
              </ThemedText>
              <Row style={{ marginBottom: 8}}>
                <PokemonSpec style={[styles.about, { borderRightWidth: 1, borderColor: colors.grayLight }]} image={require('@/assets/images/weight.png')} title={formatWeight(data.weight)} description="Weight"/>
                <PokemonSpec style={[styles.about, { borderRightWidth: 1, borderColor: colors.grayLight }]} image={require('@/assets/images/straighten_2.png')} title={`${data.height} m`} description="Height"/>
                <PokemonSpec 
                  style={styles.about} 
                  title={data.moves.slice(0, 2).map((m) => capitalizeFirstLetter(m.move.name)).join("\n")}
                  description="Moves"
                />
              </Row>

              <ThemedText style={styles.flavor} color="grayDark" variant="body3">
                { bio ? cleanText(bio.flavor_text) : 'unknown' }
              </ThemedText>
              
              <ThemedText variant="subtitle1" style={[styles.subtitle, { color: colorType }]}>
                Base stats
              </ThemedText>
            </Card>
          </View>
        </View>
      </RootView>
    </Animated.View>
  )
}
