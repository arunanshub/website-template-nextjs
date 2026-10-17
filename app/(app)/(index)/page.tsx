import { isDefinedError, safe } from '@orpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { io } from 'next/cache'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import { orpcQuery } from '@/lib/orpc/client'
import { getQueryClient } from '@/lib/query'

import {
  FetchDataOnClient,
  ShowStreaming,
  ShowToast,
  SuspendedDataOnClient,
} from './_components/client'
import { r } from './functions'

export default function Home() {
  return (
    <div className="">
      <Button>Static button</Button>

      <ShowToast />

      <Suspense fallback={<div>loading</div>}>
        <LoadData />
      </Suspense>

      <FetchDataOnClient />

      <ShowStreaming />

      <Suspense fallback={<div>The suspended data is loading...</div>}>
        <PrefetchedData />
      </Suspense>
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

async function PrefetchedData() {
  await io()
  const queryClient = getQueryClient()
  void queryClient.query(orpcQuery.index.fetchData.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspendedDataOnClient />
    </HydrationBoundary>
  )
}
