'use client'

import CloseIcon from '@mui/icons-material/Close';
import { Inter } from 'next/font/google'
import BlackButton from '../buttons/BlackButton';
import { AlertTriangle, X } from 'lucide-react';
import SecondaryButton from '../buttons/SecondaryButton';

const inter = Inter({ subsets: ['latin'] })

export default function DeleteConfirmationModal({ label,setShowDeleteModal,deleteElement }) {

    return (
        <>
            <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-50 flex justify-center items-center'
                onClick={() => setShowDeleteModal(false)}>
            </div>
            <div className='card-payment-modal px-[30px] py-[30px]  bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl w-[450px]'>
                <div className='w-full max-h-[600px] p-2 mt-2 flex flex-col items-center'>
                    <AlertTriangle size={40} color='red'/>
                    <h1 className='text-[30px] text-center'>Are you sure?</h1>
                    <p className='mt-4'>{`This action will delete this ${label}.`}</p>
                    <p className='mt-1'>You won&apos;t be able to revert this!</p>

                    <div className='flex w-full justify-between'>
                        <div className='text-end mt-5'>
                            <SecondaryButton label='Cancel' dark={true} onClick={() => setShowDeleteModal(false)} />
                        </div>
                        <div className='text-end mt-5'>
                            <BlackButton label='Yes, delete it' onClick={deleteElement} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
