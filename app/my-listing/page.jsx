'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'


export default function MyListing() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  return (
    <div className='mt-[120px]'>{id}</div>
  )
}
