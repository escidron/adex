import { useContext, useState } from 'react'
import { FilterContext } from '@/app/market-place/page';
import axios from 'axios';
import SecondaryButton from '../buttons/SecondaryButton'
import BlackButton from '../buttons/BlackButton'
import PriceSlider from '../slider/PriceSlider';
import { X } from 'lucide-react';
import { Divider } from '@mui/material';
import { useEffect } from 'react';
import haversine_distance from '@/utils/haversine_distance';
import { MapCoordinatesContext } from '@/app/market-place/page';
import { Button } from '../ui/button';
import { DialogFooter, DialogTrigger } from '../ui/dialog';

export default function MarketPlaceFilterModal({ setOpenFilter }) {
    const [adFilter, setAdFilter] = useContext(FilterContext)
    const [filteredData, setfilteredData] = useState([]);
    const [filters, setFilters] = useState(adFilter);
    const [coords] = useContext(MapCoordinatesContext)



    useEffect(() => {
        setfilteredData([])
        axios.post("https://test.adexconnect.com/api/advertisements",
            {
                radius: filters.radius,
                type: filters.type,
                adGroup: filters.adGroup,
                priceMin: filters.priceMin,
                priceMax: filters.priceMax,
            }, {
            withCredentials: true,
        }
        ).then(function (response) {
            const newData = []
            response.data.data.map((advertisement) => {
                var distance = haversine_distance(coords, { lat: advertisement.lat, lng: advertisement.long });
                if (distance < filters.radius) {
                    newData.push(advertisement)
                }
            })
            setfilteredData(newData)
        })
            .catch(function (error) {
                console.log(error)
            });
    }, [filters]);

    const handleRadius = (e) => {
        const id = e.id
        switch (id) {
            case '1':
                if (filters.radius === 100) {
                    setFilters({ ...filters, radius: 50 });

                } else {
                    setFilters({ ...filters, radius: 100 });
                }
                break;
            case '2':
                if (filters.radius === 500) {
                    setFilters({ ...filters, radius: 50 });

                } else {
                    setFilters({ ...filters, radius: 500 });
                } break;
            case '3':
                if (filters.radius === 1000) {
                    setFilters({ ...filters, radius: 50 });

                } else {
                    setFilters({ ...filters, radius: 1000 });
                } break;
            default:
                if (filters.radius === 60000) {
                    setFilters({ ...filters, radius: 50 });

                } else {
                    setFilters({ ...filters, radius: 60000 });
                } break;
        }
    }

    const handleType = (e) => {
        const id = e.id
        if (filters.type == id) {

            setFilters({ ...filters, type: '' });
        } else {

            setFilters({ ...filters, type: id });
        }
    }

    const handleGroup = (e) => {
        const id = e.currentTarget.id
        if (id == filters.adGroup) {

            setFilters({ ...filters, adGroup: '' });
        } else {

            setFilters({ ...filters, adGroup: id });
        }
    }

    const applyFilter = () => {
        setAdFilter(filters)
        setOpenFilter(false)
    }
    const removeFilter = () => {
        setFilters({
            radius: 50,
            type: '',
            adGroup: '',
            priceMin: 0,
            priceMax: 1000000
        })
    }

    return (
        <>

            <div className='  bg-white    rounded-xl '>

                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '10px', marginBottom: '20px' }} />
                <div className='flex flex-col items-center'>
                    <div className='px-[20px]  flex flex-col items-center  gap-6'>
                        <div className='w-full flex flex-col items-start '>
                            <label>Search radius (in miles)</label>
                            <div className='mt-2 '>
                                <button onClick={(e) => handleRadius(e.target)} id={1} className={`${filters.radius == 100 ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>100</button>
                                <button onClick={(e) => handleRadius(e.target)} id={2} className={`${filters.radius == 500 ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>500</button>
                                <button onClick={(e) => handleRadius(e.target)} id={3} className={`${filters.radius == 1000 ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'} hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>1000</button>
                                <button onClick={(e) => handleRadius(e.target)} id={4} className={`${filters.radius == 60000 ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'} hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>+2000</button>

                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start'>
                            <label>Seller type</label>
                            <div className='flex gap-2 mt-2'>
                                <button onClick={(e) => handleGroup(e)} id={1} href='/login' className={`flex items-center justify-center h-10 px-[15px] ${filters.adGroup == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>
                                    <p className=' flex items-center'>Business</p>
                                </button>
                                <button onClick={(e) => handleGroup(e)} id={2} href='/login' className={`flex items-center justify-center h-10 px-[15px] ${filters.adGroup == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>
                                    <p className=' flex items-center'>Individual</p>
                                </button>
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start'>
                            <label>Avertisement type</label>
                            <div className='mt-2 flex justify-end'>
                                <button type="button" onClick={(e) => handleType(e.target)} id={1} className={`${filters.type == '1' ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>Person</button>
                                <button type="button" onClick={(e) => handleType(e.target)} id={2} className={`${filters.type == '2' ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>Place</button>
                                <button type="button" onClick={(e) => handleType(e.target)} id={3} className={`${filters.type == '3' ? 'text-black bg-[#FCD33B]' : 'text-white bg-black'}  hover:bg-[#FCD33B] hover:text-black   font-medium rounded-3xl text-sm px-4 py-2 mr-2 mb-2   focus:outline-none`}>Thing</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>

                        <div className='px-[20px] mt-4   '>
                            <PriceSlider filters={filters} setFilters={(newPrices) => setFilters(newPrices)} />
                        </div>
                    </div>

                </div>
                <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />
                <DialogFooter className='sm:justify-between'>
                    <Button type="submit" variant='outline' className='flex gap-2' onClick={removeFilter}>
                        <p>Remove Filter</p>
                    </Button>
                    <DialogTrigger >
                        <Button type="submit" className='flex gap-2' onClick={applyFilter}>
                            <p>{`Filter  (${filteredData.length})`}</p>
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </div>

        </>
    )
}
