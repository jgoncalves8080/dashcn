'use client'

import Head from 'next/head'
import { useEffect } from 'react'

type Props = {
  error: Error
  reset(): void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error, reset])

  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <h3>Oops... Algo deu errado!</h3>
    </>
  )
}
