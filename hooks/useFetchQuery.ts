import { POKEDEX_API_URL } from '@env';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

export function useFetchQuery<T>(path: string) {
  return useQuery({
    queryKey: [path],
    queryFn: async (): Promise<T> => {
      const response = await fetch(`${POKEDEX_API_URL}${path}`)
      return response.json()
    }
  })
}

export function useInfiniteFetchQuery<T>(path: string) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: POKEDEX_API_URL + path,
    queryFn: async ({pageParam}): Promise<T> => { 
      const response = await fetch(pageParam, {
        headers: {
          "Accept": "application/json"
        }
      })
      return response.json()
    },
    getNextPageParam: (lastPage: any) => {
      if("next" in lastPage) return lastPage.next
      return null
    }
  })
}

export function useRefreshQuery(path: string, method: () => Promise<any>){
  const queryClient = useQueryClient()
  
  const refresh = async () => {
    await queryClient.resetQueries({ queryKey: [path] })
    return method()
  }

  return {
    refresh
  }
}