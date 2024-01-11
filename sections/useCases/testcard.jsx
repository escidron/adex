import React from 'react'

export default function BookSearchCard({label,value}) {
  return (
    <div className='book_card'>
        <p>{label}</p>
        <p>{value}</p>
    </div>
  )
}
