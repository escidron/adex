import React from 'react'
import axios from 'axios'
import { Landmark, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BankAccountItem({ item, setCheckDefault, setShowDeleteModal, setDeleteId }) {

    const handleSelected = (e) => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/set-default-bank`,
            { bankId: item.id }, {
            withCredentials: true,
        })
            .then(function (response) {
                setCheckDefault(true)
                toast.success('Default Payout Method changed successfully')
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <>
            {

                <div onClick={(e) => handleSelected(e)} className={`border ${item.default_for_currency == 1 ? 'border-black' : ''} flex justify-between items-center px-[25px] py-[15px] rounded-md max-w-[450px] cursor-pointer`}>
                    <div className='flex gap-2 items-center'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center'>
                            <Landmark size='30px' />
                        </div>
                        <div >
                            <div className='flex items-center font-[400]'>
                                <p className='text-[20px]'>{item.bank_name}</p>

                            </div>

                            <div className='flex gap-2'>
                                <p>{item.routing_number}</p>
                                <p>{`**** ${item.last4}`}</p>
                                {
                                    item.default_for_currency == 1 ? (

                                        <div className='ml-3 bg-black rounded-lg py-1 px-3 '>
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

            }

        </>
    )
}
