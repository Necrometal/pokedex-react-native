import { POKEDEX_API_URL } from '@env';
import { useInfiniteQuery, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

export const formatUrl = (path: string, params?: Record<string, string | number>) => {
  return Object.entries(params ?? {})
    .reduce((acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)), path)

}

export function useFetchQuery<T>(path: string, params?: Record<string, string | number>) {
  const localUrl = formatUrl(path, params)
  // console.log(localUrl)
  return useQuery({
    queryKey: [localUrl],
    queryFn: async (): Promise<T> => {
      return fetch(`${POKEDEX_API_URL}${localUrl}`, {
        headers: {
          "Accept": "application/json"
        }
      }).then((r) => r.json())
    }
  })
}

export function useFetchQueries<T>(paths: string[], enabled: boolean) {
  return useQueries({
    queries: paths.map((q) => ({
      queryKey: [q],
      queryFn: async (): Promise<T> => {
        return fetch(`${POKEDEX_API_URL}${q}`, {
          headers: {
            "Accept": "application/json"
          }
        }).then((r) => r.json())
      },
      enabled
    }))
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