import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { api } from '../api'
import type { SkipType } from '@/schema/skip'

export const useGetAllSkips = ({
  postcode,
  area,
}: {
  postcode: string
  area: string
}): UseQueryResult<SkipType[], Error> => {
  return useQuery({
    queryKey: ['getAllSkips', postcode, area],
    queryFn: () => api.skips.getAll({ postcode, area }),
  })
}
