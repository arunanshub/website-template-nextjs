'use client'

import { useQuery } from '@tanstack/react-query'

import { orpcQuery } from '@/lib/orpc/client'

export function FetchDataOnClient() {
  const { data, isLoading } = useQuery(orpcQuery.index.fetchData.queryOptions())

  return (
    <div>
      {isLoading && <div>The data is still loading</div>}
      {data !== undefined && <div>This data is from server: {data}</div>}
    </div>
  )
}
