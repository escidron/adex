import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Trash } from 'lucide-react';
export default function PaymentMethodItem({ item, setCheckDefault, setShowDeleteModal,setDeleteId }) {
    const handleSelected = (e) => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/set-default-card`,
            { cardId: item.id }, {
            withCredentials: true,
        })
            .then(function (response) {
                setCheckDefault(true)
                console.log('response', response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }


    return (
        <div onClick={(e) => handleSelected(e)} className={`border ${item.is_default == 1 ? 'border-black' : ''} flex justify-between items-center px-[30px] py-[15px] rounded-md max-w-[450px] cursor-pointer`}>
            <div className='flex gap-2 items-center'>
                <div className='w-[40px] h-[40px] '>
                    <Image
                        src={`/${item.card.brand.toLowerCase()}.png`}
                        alt="card brand"
                        priority
                        width={100}
                        height={100}
                    />
                </div>
                <div className='ml-1'>
                    <p className='font-semibold'>{item.name_on_card}</p>
                    <div className='flex items-center font-[400] gap-1'>
                        <div className='h-[15px] '>
                            <p className=' font-semibold text-[15px]'>**** **** ****</p>
                        </div>
                        <p className='font-semibold'>{item.card.last4}</p>

                    </div>

                    <div className='flex gap-2 items-center'>
                        <p >Expiration: </p>
                        <p className='font-semibold'>{`${item.card.exp_month}/${item.card.exp_year}`}</p>
                        {
                            item.is_default == 1 ? (

                                <div className='ml-3 bg-black rounded-lg py-1 px-3'>
                                    <p className='text-white text-[10px]'>Default</p>
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
            <div onClick={(e) => {
                e.stopPropagation()
                setDeleteId(item.id)
                setShowDeleteModal(true)
            }} className='p-2 rounded-md hover:bg-slate-100 cursor-pointer'>
                <Trash />
            </div>

        </div>
    )
}
