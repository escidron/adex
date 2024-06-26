import LineChartComponent from '@/components/charts/LineChartComponent'
import React from 'react'
import Image from 'next/image'



export default function DashboardPanel({ balance }) {
    const pendingPayments = (balance.pending[0].amount/ 100).toFixed(2)
    return (
        <>
            <div className='p-4 bg-[#D9D9D9] flex h-[calc(100vh-340px)]'>
                <div className='w-full px-2  min-h-[400px] h-[calc(100%-0.5rem)]'>
                    <div className='w-full  grid grid-cols-4 gap-2 h-[30%]'>
                        <div className='w-full h-[100%] min-h-[140px] bg-white rounded-lg flex justify-center items-center'>
                            <div className={`flex flex-col  items-center`}>
                                <label className='font-[600] text-[15px]'>Current Balance</label>
                                <h1 className='text-[20px] text-[#31639C]'>$0</h1>
                            </div>
                        </div>
                        <div className='w-full h-[100%] min-h-[140px] bg-white rounded-lg flex justify-center items-center'>
                            <div className={`flex flex-col  items-center`}>
                                <label className='font-[600] text-[15px]'>Pending Transactions</label>
                                <h1 className='text-[20px] text-[#31639C]'>$ {pendingPayments}</h1>
                            </div>
                        </div>
                        <div className='w-full h-[100%] min-h-[140px] bg-white rounded-lg flex justify-center items-center'>
                            <div className={`flex flex-col  items-center`}>
                                <label className='font-[600] text-[15px]'>Total Revenue</label>
                                <h1 className='text-[20px] text-[#31639C]'>$</h1>
                            </div>
                        </div>
                        <div className='w-full h-[100%] min-h-[140px] bg-white rounded-lg flex justify-center items-center'>
                            <div className={`flex flex-col  items-center`}>
                                <label className='font-[600] text-[15px]'>Taxable Income</label>
                                <h1 className='text-[20px] text-[#31639C]'>$0</h1>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[70%] mt-2 grid grid-cols-4 gap-2 '>
                        <div className='col-span-3 bg-white rounded-lg   flex justify-center h-[calc(100%-0.5rem)]'>
                            <LineChartComponent />
                        </div>
                        <div className={` bg-white rounded-lg flex flex-col justify-center items-center  h-[calc(100%-0.5rem)] `}>
                            <p className='font-[600] text-[15px]'>Longest Booked Ad</p>
                            <div className='relative flex flex-col justify-center items-center w-[250] h-[250]'>
                                <Image
                                    src='/calendar 1.png'
                                    alt="calendar"
                                    width={1800}
                                    height={1800}

                                    className='w-[250px]'
                                    priority
                                />
                                <p className='absolute top-[40%] left-[35%] text-[50px] font-[600]'>180</p>
                                <p className='absolute top-[70%] left-[45%] text-[15px] font-[600]'>days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
