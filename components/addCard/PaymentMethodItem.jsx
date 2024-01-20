import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PaymentMethodItem({ item, setRefetch, deleteElement }) {
    const handleSelected = (e) => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/set-default-card`,
            { cardId: item.id }, {
            withCredentials: true,
        })
            .then(function (response) {
                setRefetch(prev => !prev)

            })
            .catch(function (error) {
                console.log(error)
            });
    }


    return (
        <div onClick={(e) => handleSelected(e)} className={`border ${item.is_default == 1 ? 'border-black' : ''} flex justify-between items-center px-[10px] sm:px-[30px] py-[15px] rounded-md min-w-[280px] sm:min-w-[350px] max-w-[450px] cursor-pointer`}>
            <div className='flex gap-2 items-center'>
                <div className='w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]'>
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
                            <p className=' font-semibold text-[13px] sm:text-[15px]'>**** **** ****</p>
                        </div>
                        <p className='font-semibold text-[13px] sm:text-[16px]'>{item.card.last4}</p>

                    </div>

                    <div className='flex gap-2 items-center'>
                        <p className='text-[13px] sm:text-[16px]'>Expiration: </p>
                        <p className='font-semibold text-[13px] sm:text-[16px]'>{`${item.card.exp_month}/${item.card.exp_year}`}</p>
                        {
                            item.is_default == 1 ? (

                                <div className='ml-1 sm:ml-3 bg-black rounded-lg py-1 px-2 sm:px-3'>
                                    <p className='text-white text-[8px] sm:text-[10px]'>Default</p>
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>

            <div onClick={(e)=>e.stopPropagation()}>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className="p-2 rounded-md hover:bg-slate-100 cursor-pointer" >
                            <Trash size={20} />
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[90%]'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this payment method.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={(e) => {
                                deleteElement(item.id)
                                setRefetch(prev => !prev)
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    )
}
