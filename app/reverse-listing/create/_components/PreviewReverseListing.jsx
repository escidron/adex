
import { useContext, useState, useEffect } from 'react'
import { MapPin } from 'lucide-react';
import { formatPrice } from '@/utils/format';
import { checkCategoryType } from '@/utils/checkCategoryType';
import { Preview } from '@/components/textarea/TextAreaReader';
import GetCategories from '@/actions/GetCategories';


const otherListingType = [8, 12, 18]//categories of other


export default function PreviewReverseListing({ ListingContext }) {
    const [categoryType, setCategoryType] = useState('');
    const [listingProperties, setListingProperties] = useContext(ListingContext)
    useEffect(() => {
        if (listingProperties.otherListingType && otherListingType.includes(listingProperties.sub_category)) {
            setCategoryType(listingProperties.otherListingType)

        } else {

            const categoryType = checkCategoryType(listingProperties.sub_category)
            setCategoryType(categoryType)
        }
    }, []);

    useEffect(() => {

        async function GetCategory() {
            const categories = await GetCategories()
            console.log('categories', categories)
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].id == listingProperties.sub_category) {
                    setListingProperties({ ...listingProperties, title: `Looking for: ${categories[i].name}`})
                }
            }
        }
        GetCategory()

    }, []);
    return (
        <div className='w-full flex flex-col items-center overflow-y-auto invisible_scroll_bar'>
            <div className='w-full sm:w-[500px] flex flex-col items-center'>

                <div className='flex flex-col'>
                    <h1 className='text-[24px] md:text-[32px]'>How your listing will look like.</h1>
                    <p className='text-[15px] md:text-[18px] text-gray-500'>We are almost done, before you finalize your listing, take a moment to review and confirm the details.</p>
                </div>
                <div className="p-2 mt-6 rounded-[24px] w-[90%] sm:w-[80%] border shadow-sm">
                    <div className='w-full p-[10px] mt-1'>
                        <div className="w-full flex items-center justify-between">
                            <p className="font-[600] text-[20px] line-clamp-1">{listingProperties.title}</p>
                        </div>
                        <div className='flex gap-1 mt-2'>
                            <MapPin size={14} color='gray' />
                            {
                                listingProperties.location ? (

                                    <p className='text-[12px] text-gray-500'>{listingProperties.location}</p>
                                ) : (

                                    <p className='text-[12px] text-gray-500'>Online Asset</p>
                                )
                            }
                        </div>
                        <div className='mt-2 text-[14px]'>
                            <Preview value={listingProperties.description} heigth={80} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
