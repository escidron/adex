import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';

export default function BankAccountItem({ item, setCheckDefault }) {

    const handleSelected = (e) => {
        axios.post('https://adexconnect.com/api/payments/set-default-bank',
            { bankId: e.target.id }, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                setCheckDefault(true)
                .log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    return (
        <>
            {
                item.account_number ? (
                    <div className={`border ${item.is_default == 1 ? 'border-black' : ''} flex justify-between items-center px-[30px] py-[15px] rounded-md max-w-[450px]`}>
                        <div className='flex gap-2 items-center'>
                            <div className='w-[40px] h-[40px] flex justify-center items-center'>
                                <AccountBalanceIcon sx={{ fontSize: '30px' }} />
                            </div>
                            <div >
                                <div className='flex items-center font-[400]'>
                                    <p className='text-[20px]'>{item.bank_name}</p>
                                    {
                                        item.is_default == 1 ? (

                                            <div className='ml-3 bg-black rounded-lg py-1 px-3'>
                                                <p className='text-white text-[10px]'>Default</p>
                                            </div>
                                        ) : ''
                                    }
                                </div>

                                <div className='flex gap-3'>
                                    <p>{item.routing_number}</p>
                                    <p>{`**** ${item.account_number.substring(item.account_number.length - 4)}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='focus:outline-none '>
                            <input onChange={(e) => handleSelected(e)} type="radio" value="" checked={item.is_default == 1 ? true : false} id={item.external_account_id} className='text-black checked:text-black cursor-pointer' />
                        </div>
                    </div>
                ) : ('')
            }

        </>
    )
}
