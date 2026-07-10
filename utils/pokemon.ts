import { OFFICIAL_ARTWORK_PATH } from "@/constants/path"
import { PokemonType } from "@/repositories/model/pokemon"

export function getPokemonId(url: string) {
  return parseInt(url.split('/').at(-2)!, 10)
}

export function getPokemonArtWork(id: number): string {
  return `${OFFICIAL_ARTWORK_PATH}${id}.png`
}

export function formatWeight(weight?: number): string {
  if(!weight) return ""
  return (weight / 10).toString().replace('.', ',') + 'kg'
}

export function retrieveWeakness(relation: PokemonType[]) {
  return relation.reduce((acc, item) => {
    if(acc.length === 0) acc = [...item.damage_relations.double_damage_from.map((d) => d.name)]
    else {
      
    }

    return acc
  }, [] as string[])
}
  