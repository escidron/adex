import * as React from 'react';
import { Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function StepperComponent({ selectedStep }) {
    return (
        <div className={`flex mx-auto mt-4 w-full sm:w-[600px] items-center justify-center flex-col ${inter.className}`}>
            <div className='w-full flex justify-evenly px-2 items-center'>
                <div>
                    <div className={`${selectedStep === 1 ? ' bg-black text-[#FCD33B]' : ' bg-[#FCD33B] text-black'} font-[600] w-[40px] h-[40px] rounded-full  flex justify-center items-center`}>
                        {selectedStep > 1 ? (
                            <CheckIcon />
                        ) : (
                            <p>1</p>
                        )}
                    </div>
                </div>
                <Divider variant="middle" sx={{ color: 'black', width: '30%', marginTop: '20px', marginBottom: '20px' }} />
                <div>
                    <div className={`${selectedStep === 1 ? ' bg-black text-white' : selectedStep === 2 ? ' bg-black text-[#FCD33B]' : 'bg-[#FCD33B] text-black'} font-[600] w-[40px] h-[40px] rounded-full  flex justify-center items-center`}>
                        {selectedStep < 3 ? (
                            <p>2</p>
                        ) : (
                            <CheckIcon />
                        )}
                    </div>
                </div>
                <Divider variant="middle" sx={{ color: 'black', width: '30%', marginTop: '20px', marginBottom: '20px' }} />
                <div>
                    <div className={`${selectedStep < 3 ? ' bg-black text-white' :selectedStep===3?'bg-black text-[#FCD33B]': ' bg-[#FCD33B] text-black'} font-[600] w-[40px] h-[40px] rounded-full  flex justify-center items-center`}>
                        {selectedStep > 3 ? (
                            <CheckIcon />
                        ) : (
                            <p>3</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <p className='text-[15px]'>Asset Category</p>
                </div>
                <div>
                    <p className='text-[15px]'>Asset Type</p>
                </div>
                <div>
                    <p className='text-[15px]'>Create Ad</p>
                </div>
            </div>
        </div>
    );
}
