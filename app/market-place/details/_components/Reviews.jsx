'use client'

import GetListingReviews from '@/actions/GetListingReviews';
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard';
import SeeAllReviews from './SeeAllReviews';

export default function Reviews({ listingId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    async function getInfo() {
      const reviews = await GetListingReviews(listingId)
      setReviews(reviews)
    }
    getInfo();

  }, []);
  return (
    <div>
      <div className='flex gap-1 items-center'>
        <p className='text-[26px]'>Reviews</p>
        <p className='text-[16px] mt-[10px] text-gray-600 '>{`(${reviews.length})`}</p>
      </div>
      <div className='mt-8 grid gap-4 grid-cols-1 md:grid-cols-2'>
        {
          reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
          ))
        }
      </div>
      {
        reviews.length > 0 && (
          <div className='mt-4 w-full flex justify-center'>
            <SeeAllReviews reviews={reviews}/>
          </div>
        )
      }
    </div>
  )
}
