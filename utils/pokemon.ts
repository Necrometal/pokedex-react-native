import { OFFICIAL_ARTWORK_PATH } from "@/constants/path"

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
  