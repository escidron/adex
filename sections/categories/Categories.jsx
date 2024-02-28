import GetCategories from '@/actions/GetCategories';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const hideCategories = [8,12,19,20,21,22]
    useEffect(() => {

        async function getInfo() {

            const categories = await GetCategories()
            setCategories(categories)
        }
        getInfo();

    }, []);


    return (
        <div className='w-full xl:w-[1100px] flex flex-col justify-center items-center mx-auto mt-10 px-4'>

            <p className='text-center text-[20px] sm:text-[25px] lg:text-[28px] xl:text-[35px] '>Some of our <span className='text-[#FCD33B] mx-2'>Listing Categories</span></p>
            <div className=' w-full mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-rows-2 gap-4'>

                {
                    categories.map((category,index) => {
                        let description = ''
                        if(hideCategories.includes(category.id)){
                            return null
                        }   
                        if(category.id == 13 || category.id == 14 || category.id == 15 || category.id == 16){
                            description = category.name
                        }

                        return (
                            <div key={category.id} className={` ${index > 16 ? 'hidden md:flex' : 'flex'}  justify-center items-center h-[120px] w-[120px]  max-h-[150px]`}>
                                <Link href={`/market-place?type=${category.id}${description && `&key=${description}`}`} className={`flex flex-col cursor-pointer  items-center justify-center  h-[120px] w-[120px]  max-h-[150px]  bg-black  px-4 py-[24px] rounded-lg hover:opacity-80`}>
                                    <div className='flex justify-center h-[40px] md:h-[74px] aspect-square'>
                                        <Image
                                            src={'/' + category.image}
                                            alt={'/' + category.image}
                                            width={40}
                                            height={40}
                                            priority
                                        />
                                    </div>
                                    <h1 className='text-[#FCD33B] text-[14px] flex justify-center items-center text-center mt-1'>{category.name}</h1>
                                </Link>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>

    )
}
