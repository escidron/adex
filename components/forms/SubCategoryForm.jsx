
import axios from 'axios'
import CategoryCard from '../categories/CategoryCard';

import { useEffect, useState,useContext } from 'react'
import { ListingContext } from '@/app/listing/layout';

export default function SubCategoryForm() {
    const [categories, setCategories] = useState([]);
    const [listingProperties, setListingProperties] = useContext(ListingContext)

    useEffect(() => {
        axios('https://test.adexconnect.com/api/list-property',
            {}, {
            withCredentials: true,
        })
            .then(function (response) {
                const allCategories = response.data
                const selectedCategories = []
                allCategories.map((category) => {
                    if (category.parent_id == listingProperties.category) {
                        selectedCategories.push(category)
                    }
                })
                setCategories(selectedCategories)
            })
            .catch(function (error) {
            });
    }, [])
    return (
        <div className='w-full '>
            <div className='flex flex-col'>
                <h1 className='text-[32px]'>Sub-Category</h1>
                <p className='text-[18px] text-gray-500'>Choose which category best suits your needs or interests.</p>
            </div>
            <div className='w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                {
                    categories.map((category,index) => (
                        <div key={category.id}  >
                            <CategoryCard
                                item={category}
                                selected={ listingProperties.sub_category == category.id}
                                setListingProperties={(selectedId)=>setListingProperties((prev)=>({...prev,sub_category:selectedId}))}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}