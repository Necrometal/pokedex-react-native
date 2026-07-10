import PokemonViewDetails from "@/components/Pokemon/ViewDetails";
import useRenderInfo from "@/components/Pokemon/ViewDetails/useRenderInfo";
import { COUNT_POKEMON } from "@/constants/pokemon";
import usePokemonDetail, { usePokemonSpecies } from "@/hooks/screen/usePokemonDetail";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import PagerView, { PagerViewOnPageSelectedEvent, PageScrollStateChangedNativeEvent } from 'react-native-pager-view';


export default function Pokemon(){
  const params = useLocalSearchParams()
  const [id, setId] = useState(parseInt(params.id as string, 10)) 
  const offset = useRef(1)
  const pager = useRef<PagerView>(null)

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    offset.current = e.nativeEvent.position - 1
  }

  const onPageScrollStateChanged = (e: PageScrollStateChangedNativeEvent) => {
    if(e.nativeEvent.pageScrollState !== 'idle') return
    if(offset.current === -1 && id === 2) return
    if(offset.current === 1 && id === COUNT_POKEMON) return

    if(e.nativeEvent.pageScrollState === 'idle' && offset.current !== 0){
      setId(id + offset.current)
      offset.current = 0
      pager.current?.setPageWithoutAnimation(1)
    }
  }

  const onNext = () => pager.current?.setPage(2)
  const onPrevious = () => pager.current?.setPage(0)

  return (
    <PagerView
      ref={pager}
      initialPage={1}
      style={{ flex: 1 }}
      onPageScrollStateChanged={onPageScrollStateChanged}
      onPageSelected={onPageSelected}
    >
      <PokemonView onNext={onNext} onPrevious={onPrevious} id={id - 1} key={id - 1}/>
      <PokemonView onNext={onNext} onPrevious={onPrevious} id={id} key={id}/>
      <PokemonView onNext={onNext} onPrevious={onPrevious} id={id + 1} key={id + 1}/>
    </PagerView>
  )

}

type Props = {
  id: number,
  onPrevious: () => void,
  onNext: () => void,
}

function PokemonView({ id, onPrevious, onNext }: Props) {
  const { data, isPending } = usePokemonDetail(id)
  const { data: species, isPending: isPendingSpecies } = usePokemonSpecies(id)

  const pokemon = useRenderInfo(data)
  
  return (
    <PokemonViewDetails  
      pokemon={pokemon} 
      species={species}
      onNext={onNext} 
      onPrevious={onPrevious}
      isFetching={isPending || isPendingSpecies}
    />
  )
}