export type Pokemon = {
  id: number;
  name: string;
  url: string;
}

export type General = {
  name: string;
  url: string;
}

export type Ability = General

export type AbilityItem = {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export type GameIndiceItem = {
  game_index: number;
  version: General
}

export type VersionDetail = {
  rarity: number;
  version: General
}

export type HeldItem = {
  item: General;
  version_details: VersionDetail
}

export type VersionGroupDetail = {
    level_learned_at: number;
    move_learn_method: General;
    version_group: General
  }

export type MoveItem = {
  move: General;
  version_group_details: VersionGroupDetail[]
}

export type PastAbility = {
  abilities: AbilityItem[];
  generation: General
}

export type StatItem = {
  base_stat: number;
  effort: number;
  stat: General;
}

export type PastStat = {
  generation: General;
  stats: StatItem[]
}

export type SpriteGeneral = {
  front_default: string;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

export type OtherSprite = {
  dream_world: SpriteGeneral;
  'official-artwork': SpriteGeneral;
  home: SpriteGeneral;
  showdown: Sprite  
}

export type Sprite = {
  back_default: string;
  back_female?: string | null;
  back_shiny?: string;
  back_shiny_female?: string | null;
  front_default: string;
  front_female?: string | null;
  front_shiny?: string;
  front_shiny_female?: string | null;
  other?: OtherSprite;
  versions?: any;
}

export type Stat = {
  base_stat: number;
  effort: number;
  stat: General;
}

export type PokemonTypeItem = {
  slot: number;
  type: General;
}

export type PokemonDetails = {
  abilities: AbilityItem[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: General[];
  game_indices: GameIndiceItem[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MoveItem[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_stats: PastStat[];
  past_types: any[];
  species: General;
  sprites: Sprite;
  stats: Stat[];
  weight: number;
  types: PokemonTypeItem[];
}

export type FlavorText = {
  flavor_text: string,
  language: General,
  version: General
}

export type PokemonSpecies = {
  flavor_text_entries?: FlavorText[]
}

export type PokemonDamage = {
  double_damage_to: General[],
  double_damage_from: General[],
  half_damage_to: General[],
  half_damage_from: General[],
  no_damage_from: General[],
  no_damage_to: General[],
}

export type PokemonType = {
  damage_relations: PokemonDamage
}
