import GetCategories from '@/actions/GetCategories';
import Image from 'next/image';
import { useState, useEffect } from 'react'

export default function Categories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {

        async function getInfo() {

            const categories = await GetCategories()
            setCategories(categories)
        }
        getInfo();

    }, []);

    return (
        <div className='w-full xl:w-[1100px] flex flex-col justify-center items-center mx-auto mt-10 px-4'>

            <p className='text-center text-[25px] lg:text-[28px] xl:text-[35px] '>Some of our <span className='text-[#FCD33B] mx-2'>Listing Categories</span></p>
            <div className=' w-full mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-rows-2 gap-4'>
            {/* <div className='mx-auto w-full mt-4 flex flex-wrap gap-2'> */}

                {
                    categories.map((category) => {

                        if(category.id == 8 || category.id == 12){
                            return null
                        }   
                        return (
                            <div key={category.id} className='flex justify-center items-center h-[120px] w-[120px]  max-h-[150px]'>
                                <div className={`flex flex-col  items-center justify-center  h-[120px] w-[120px]  max-h-[150px]  bg-black  px-4 py-[24px] rounded-lg hover:opacity-80 cursor-pointer`}>
                                    <div className='h-[40px] md:h-[74px] aspect-square'>
                                        <Image
                                            src={'/' + category.image}
                                            alt={'/' + category.image}
                                            width={40}
                                            height={40}
                                            priority
                                        />
                                    </div>
                                    <h1 className='text-[#FCD33B] text-[14px] flex justify-center items-center text-center mt-1'>{category.name}</h1>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>

    )
}
