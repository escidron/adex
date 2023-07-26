import React from 'react'
import Image from 'next/image'
import axios from 'axios'
export default function PaymentMethodItem({ item,setCheckDefault }) {

    const handleSelected = (e) => {
        axios.post('http://3.132.48.54:5000/api/payments/set-default-card',
        {cardId:e.target.id}, {
        withCredentials: true,
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(function (response) {
            setCheckDefault(true)
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    return (
        <div className={`border ${item.is_default == 1 ? 'border-black' : ''} flex justify-between items-center px-[30px] py-[15px] rounded-md max-w-[450px]`}>
            <div className='flex gap-2 items-center'>
                <div className='w-[40px] h-[40px] '>
                    <Image
                        src={`/${item.card_brand.toLowerCase()}.png`}
                        alt="card brand"
                        priority
                        width={100}
                        height={100}
                    />
                </div>
                <div >
                    <div className='flex items-center font-[400]'>
                        <p className='text-[20px]'>{`${item.card_brand.toLowerCase() === 'visa' ? 'Visa ' : 'MasterCard '}`}</p>
                        <div className='h-[15px] ml-1'>
                            <p className='ml-[1px]'>****</p>
                        </div>
                        <p>{item.card_number}</p>
                        {
                            item.is_default == 1 ? (

                                <div className='ml-3 bg-black rounded-lg py-1 px-3'>
                                    <p className='text-white text-[10px]'>Default</p>
                                </div>
                            ) : ''
                        }
                    </div>

                    <div>
                        <p>{`Expiration: ${item.expiry_date.substring(5, 7)}/${item.expiry_date.substring(0, 4)}`}</p>

                    </div>
                </div>
            </div>
            <div className='focus:outline-none'>
                <input onChange={(e) => handleSelected(e)} type="radio" value="" checked={item.is_default == 1 ? true : false} id={item.stripe_payment_method_id} className='text-black checked:text-black' />
            </div>
        </div>
    )
}
