import React from 'react'
import CategoryCard from './CategoryCard'

export default function Categories() {
  return (
    <div className='grid grid-cols-4 gap-4'>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
    </div>
  )
}
