'use client'
import AdDetails from '@/app/market-place/details/page'
import React from 'react'

export default function SharingPage() {
    return (
        <>
            <meta property="og:url" content="https://adexconnect.com/my-listing/sharing-listing" />
            <meta property="fb:app_id" content="1611678826026608" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content="Name of the listing" />
            <meta property="og:description" content="Las Piñas Greande Manila" />
            <meta property="og:image" content="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" />
            <div className='mt-[120px]'>
                {/* <AdDetails /> */}
            </div>

        </>
    )
}
