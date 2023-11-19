"use client"
import MarketPlaceCard from '../marketPlaceCard/MarketPlaceCard';
import PlacesAutocomplete from '../../placesAutocomplete/PlacesAutocomplete';
import MarketPlaceFilterModal from '@/components/modals/MarketPlaceFilterModal'
import MarketPlaceFooter from '@/components/footer/MarketPlaceFooter'
import qs from "query-string";

import { useState, useEffect } from 'react'
import { SlidersHorizontal } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import TermsOfUseModal from '@/components/modals/TermsOfUseModal';


export default function MarketPlaceGrid({ newData, isDataLoaded }) {
    const [selected, setSelected] = useState(null);
    const [address, setAddress] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(true);
    const [openFilter, setOpenFilter] = useState(false);

    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const radius = searchParams.get("radius");
    const adGroup = searchParams.get("adGroup");
    const type = searchParams.get("type");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const key = searchParams.get("key");
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                radius: radius,
                adGroup: adGroup,
                type: type,
                priceMin: priceMin,
                priceMax: priceMax,
                key: debouncedValue,
                latitude:latitude,
                longitude:longitude
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, router, pathname])

    // const handleKeyDown = (event)=>{
    //     if (event.key === 'Enter') {
    //         // Ação que você deseja executar quando a tecla Enter é pressionada
    //         alert(event.target.value);
    //       }
    // }
    return (
        <div className={`min-h-[100vh] bg-[#EFEFEF]  pt-[100px] flex flex-col ${newData.length === 0 ? '' : 'relative'} `}>
            <div className="w-full abso  top-5 flex items-center px-[20px] mt-4 ">
                <label className="sr-only">Search</label>
                <div className="relative w-full ">
                    {/* google map search input */}
                    {/* <PlacesAutocomplete setSelected={setSelected} setAddress={setAddress} /> */}
                    <Input
                        className='pl-8 h-[44px]'
                        placeholder="What are you looking for?"
                        onChange={(e) => setValue(e.target.value)}
                    // onKeyDown={(e)=>handleKeyDown(e)}
                    />
                    <svg aria-hidden="true" className="absolute top-3 left-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <Dialog className='mt-8 max-h-[80vh] overflow-y-auto z-[60]'>
                    <DialogTrigger >
                        <Button className='ml-[20px]'>
                            <div className='mr-2'>
                                <SlidersHorizontal size={16} />
                            </div>
                            Filters
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] sm:max-w-[550px] z-[60]" >
                        <DialogHeader>
                            <DialogTitle>Filters</DialogTitle>
                            <DialogDescription>
                                Use the filter modal to narrow down your listing search and discover the perfect advertisements with ease.
                            </DialogDescription>
                        </DialogHeader>
                        <MarketPlaceFilterModal
                            setOpenFilter={(toggle) => setOpenFilter(toggle)}
                            counter={newData.length}
                            isDataLoaded={isDataLoaded}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {newData.length === 0 && isDataLoaded ?
                <div className={`no-data  flex-col items-center mt-[100px] ${openFilter ? 'hidden' : 'flex'}`}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.42 12.9999C9.5 12.4599 8.88 11.4599 8.88 10.3099C8.88 8.58994 10.27 7.18994 12 7.18994C13.15 7.18994 14.15 7.80994 14.69 8.73994" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.98995 17.8101C4.14995 15.3001 2.80995 12.0901 3.62995 8.49011C5.27995 1.23011 14.57 0.0601072 18.68 4.98011" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 2L2 22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className="text-[26px]">No data found within 50 miles</h1>
                    <p className='text-center'>Please choose another location or adjust the filter parameters</p>
                </div> :
                !isDataLoaded ? (
                    <div className={`no-data  flex-col items-center mt-[100px] ${openFilter ? 'hidden' : 'flex'}`}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.42 12.9999C9.5 12.4599 8.88 11.4599 8.88 10.3099C8.88 8.58994 10.27 7.18994 12 7.18994C13.15 7.18994 14.15 7.80994 14.69 8.73994" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.98995 17.8101C4.14995 15.3001 2.80995 12.0901 3.62995 8.49011C5.27995 1.23011 14.57 0.0601072 18.68 4.98011" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 2L2 22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 className="text-[26px]">Browser location restriction</h1>
                        <p className='text-center'>Please make sure your browser has access to your location and reload the page</p>
                    </div>
                )
                    :
                    <>
                        <div className={`justify-between h-[80vh] mb-[400px] mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 px-[50px] md:p-2 xl:p-[10px] ${newData.length > 0 ? 'overflow-y-scroll' : ''}`}>
                            {newData.map((ad) => (
                                <MarketPlaceCard key={ad.id} ad={ad} />
                            ))}
                            <MarketPlaceFooter />

                        </div>
                    </>
            }

            <MarketPlaceFooter isAbsolute={true} />
            {/* <Footer /> */}
            {/* {openFilter &&

                <MarketPlaceFilterModal
                    setOpenFilter={(toggle) => setOpenFilter(toggle)}
                />
            } */}
        </div>
    )
}


