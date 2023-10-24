'use client'

import { useEffect, useState } from 'react'
import PersonForm from '@/components/listingForm/PersonForm'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'


export default function EditAdvertisement() {
    const [advertisement, setAdvertisement] = useState({})
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
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
            <div className='flex justify-between items-center w-full max-w-[800px] mt-8'>
                <h1 className='text-[30px]'>{`${advertisement.status == '1' ? 'Edit your Listing' : advertisement.status == '2' || advertisement.status == '3' ? 'See your listing details' : advertisement.status == '4' ? 'See the booking request details' : ''}`}</h1>
                <Link href="/my-profile?tab=5">
                    <div type="submit" className={`flex gap-2 justify-center items-center w-full bg-black text-[#FCD33B] hover:bg-[#FCD33B] hover:text-black py-[8px] px-[30px] rounded-md text-lg`}>
                        <div className='style_banner_button_text font-semibold text-[18px]'>
                            Back
                        </div>
                    </div>
                </Link>
            </div>
            <div className={`flex justify-center max-w-[50%] mx-auto  mt-8 min-h-[400px] `}>
                {
                    advertisement.id && (
                        <PersonForm 
                            typeId={advertisement.category_id} 
                            isPeriodic={advertisement.is_periodic} 
                            hasPayout={true} 
                            edit={true} 
                            advertisement={advertisement} 
                        />
                    ) 
                }
            </div>
        </div>
    )
}
