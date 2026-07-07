import { PokemonDetails } from "@/repositories/model/pokemon";

const POKEMON_DEFAULT: PokemonDetails = {
  "abilities": [],
  "base_experience": 0,
  "cries": {
    "latest": "",
    "legacy": ""
  },
  "forms": [],
  "game_indices": [],
  "height": 0,
  "held_items": [],
  "id": 0,
  "is_default": true,
  "location_area_encounters": "",
  "moves": [],
  "name": "",
  "order": 0,
  "past_abilities": [],
  "past_stats": [],
  "species": {
    "name": "",
    "url": ""
  },
  "sprites": {
    "back_default": "",
    "back_female": null,
    "back_shiny": "",
    "back_shiny_female": null,
    "front_default": "",
    "front_female": null,
    "front_shiny": "",
    "front_shiny_female": null,
    "other": {
      "dream_world": {
        "front_default": "",
        "front_female": null
      },
      "home": {
        "front_default": "",
        "front_female": null,
        "front_shiny": "",
        "front_shiny_female": null
      },
      "official-artwork": {
        "front_default": "",
        "front_shiny": ""
      },
      "showdown": {
        "back_default": "",
        "back_female": null,
        "back_shiny": "",
        "back_shiny_female": null,
        "front_default": "",
        "front_female": null,
        "front_shiny": "",
        "front_shiny_female": null
      }
    },
    "versions": {}
  },
  "stats": [
    {
      "base_stat": 0,
      "effort": 10,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    },
    {
      "base_stat": 0,
      "effort": 0,
      "stat": {
        "name": "attack",
        "url": "https://pokeapi.co/api/v2/stat/2/"
      }
    },
    {
      "base_stat": 0,
      "effort": 0,
      "stat": {
        "name": "defense",
        "url": "https://pokeapi.co/api/v2/stat/3/"
      }
    },
    {
      "base_stat": 0,
      "effort": 0,
      "stat": {
        "name": "special-attack",
        "url": "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      "base_stat": 0,
      "effort": 0,
      "stat": {
        "name": "special-defense",
        "url": "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      "base_stat": 0,
      "effort": 0,
      "stat": {
        "name": "speed",
        "url": "https://pokeapi.co/api/v2/stat/6/"
      }
    }
  ],
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "normal",
        "url": "https://pokeapi.co/api/v2/type/1/"
      }
    }
  ],
  "weight": 0,
  "past_types": []
}

export default POKEMON_DEFAULT