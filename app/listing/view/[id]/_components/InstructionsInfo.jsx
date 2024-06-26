'use client'


import { Preview } from '@/components/textarea/TextAreaReader'

export default function InstructionsInfo({ listingProperties }) {
    return (
        <div>
            {
                (listingProperties.instructions?.length > 12) ? (
                    <>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[26px]'>Instructions</p>
                            <Preview value={listingProperties.instructions} heigth={200} autoHeigth={true}/>
                        </div>
                    </>
                ) : (
                <div>
                    <h1 className='text-[26px]'>Instructions</h1>
                    <p className='text-gray-600 italic'>No Instructions provided</p>
                </div>
                )
            }
        </div>
    )
}
