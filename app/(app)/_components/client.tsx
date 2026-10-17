'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
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

export function SuspendedDataOnClient() {
  const { data } = useSuspenseQuery(orpcQuery.index.fetchData.queryOptions())

  return <div>This data is from server: {data}</div>
}

export function ShowToast() {
  return (
    <div>
      <Button
        onClick={() => {
          toast.info('Hello from toast!')
        }}
      >
        Show toast
      </Button>
    </div>
  )
}

export function ShowStreaming() {
  const { data } = useQuery(
    orpcQuery.index.streamData.liveOptions({
      // queryFnOptions: {
      //   refetchMode: 'replace',
      // },
    }),
  )

  return <div>streaming = {JSON.stringify(data)}</div>
}
