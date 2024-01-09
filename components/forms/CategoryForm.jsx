import axios from 'axios'
import CategoryCard from '../categories/CategoryCard';
import { useEffect, useState,useContext } from 'react'

export default function CategoryForm({ ListingContext }) {
    const [categories, setCategories] = useState([]);
    const [listingProperties, setListingProperties] = useContext(ListingContext)


    useEffect(() => {
        axios(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/list-property`,
            {}, {
            withCredentials: true,
        })
            .then(function (response) {
                const allCategories = response.data
                const selectedCategories = []
                allCategories.map((category) => {
                    if (category.parent_id === 0) {
                        selectedCategories.push(category)
                    }
                })
                setCategories(selectedCategories)
            })
            .catch(function (error) {
            });
    }, [])
    return (
        <div className='w-full h-full max-w-[800px] overflow-y-auto invisible_scroll_bar mx-auto flex flex-col '>
            <div className='flex flex-col'>
                <h1 className='text-[28px] md:text-[32px]'>Category</h1>
                <p className='text-[15px] md:text-[18px] text-gray-500'>Choose the asset category that best describes your listing.</p>
            </div>
            <div className='w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>

                {
                    categories.map((category) => (
                        <div key={category.id}  >
                            <CategoryCard
                                item={category}
                                selected={listingProperties.category == category.id}
                                setListingProperties={(selectedId)=>setListingProperties((prev)=>({...prev,category:selectedId}))}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
