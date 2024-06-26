"use client"
import React from 'react'
import Carrousel from '../../components/carrousel/Carrousel'

export default function CustomerComents() {
  return (
    <div className='flex flex-col items-center justify-center p-8 md:p-[80px] mt-8'>
      <h1 className='flex text-[35px] lg:text-[51px] '>What our  <span className='text-[#FCD33B] mx-2'>customers</span>say</h1>
      <Carrousel/>
    </div>
  )
}
