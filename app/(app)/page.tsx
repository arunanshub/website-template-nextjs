import { isDefinedError, safe } from '@orpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import { orpcQuery } from '@/lib/orpc/client'
import { getQueryClient } from '@/lib/query'

import { FetchDataOnClient, SuspendedDataOnClient } from './_components/client'
import { r } from './functions'

export default async function Home() {
  'use cache'
  const queryClient = getQueryClient()
  void queryClient.query(orpcQuery.index.fetchData.queryOptions())

  return (
    <div className="">
      <Button>Static button</Button>

      <Suspense fallback={<div>loading</div>}>
        <LoadData />
      </Suspense>

      <FetchDataOnClient />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>The suspended data is loading...</div>}>
          <SuspendedDataOnClient />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

async function LoadData() {
  const [error, name] = await safe(r.getName())

  if (isDefinedError(error) || name === undefined) {
    return null
  }

  return <div>{name}</div>
}
