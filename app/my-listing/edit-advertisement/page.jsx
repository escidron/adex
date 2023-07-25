'use client'

import { useEffect, useState } from 'react'
import PersonForm from '@/components/listingForm/PersonForm'
import { useSearchParams } from 'next/navigation'
import { Inter } from 'next/font/google'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })

export default function EditAdvertisement() {
    const [advertisement, setAdvertisement] = useState({})
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    useEffect(() => {
        axios.post('http://localhost:8000/api/advertisements/my-advertisement',
            { id: id }, {
            withCredentials: true,
        })
            .then(function (response) {
                setAdvertisement(response.data.data[0])
                console.log('response', response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }, []);
    return (
        <div className={`w-full mt-[120px] h-[100vh] flex flex-col items-center mx-auto`}>
            <h1 className='text-[30px] mt-8'>{`${advertisement.status == '1'?'Edit your Listing':advertisement.status == '2' || advertisement.status == '3'?'See your listing details':advertisement.status == '4'?'See the booking request details':''}`}</h1>
            <div className={`flex justify-center max-w-[50%] mx-auto  mt-8 min-h-[400px] ${inter.className}`}>
                {
                    advertisement.id ? (
                        <PersonForm typeId={advertisement.category_id} isPeriodic={advertisement.is_periodic} hasPayout={true} edit={true} advertisement={advertisement} />
                    ) : ('')
                }
            </div>
        </div>
    )
}
