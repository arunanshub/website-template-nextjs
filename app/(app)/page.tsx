import { isDefinedError, safe } from '@orpc/server'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'

import { FetchDataOnClient } from './_components/client'
import { r } from './functions'

export default function Home() {
  return (
    <div className="">
      <Button>Static button</Button>

      <Suspense fallback={<div>loading</div>}>
        <LoadData />
      </Suspense>

      <FetchDataOnClient />
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
