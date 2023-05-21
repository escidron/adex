"use client"
import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import logo from '../../../public/adex-logo-white-yellow.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import MarketPlaceCard from '../marketPlaceCard/MarketPlaceCard';
import PlacesAutocomplete from '../../placesAutocomplete/PlacesAutocomplete';

export default function MarketPlaceGrid({newData,isLoaded}) {
    const [data, setData] = useState(newData);
    const [selected, setSelected] = useState(null);
    console.log('selected',selected)
  return (
    <div className={`min-h-[100vh] h-auto bg-[#EFEFEF]   pt-[100px] flex flex-col ${newData.length===0?'':'relative'}`}> 
        <div className='flex mt-6 mx-auto'>
            <Link href='/login' className='flex items-center justify-center ml-4 h-10 px-[15px] bg-black  rounded-md  text-white   hover:text-black hover:bg-[#FCD33B]'>
                <p className='style_market_place_button_text text-[16px] flex items-center'>Business</p>
            </Link>     
            <Link href='/login' className='flex items-center ml-4 h-10 bg-black py-[4px] px-[15px] rounded-md  text-white   hover:text-black hover:bg-[#FCD33B]'>
                <p className='style_market_place_button_text  text-[16px] flex items-center'>Individual</p>
            </Link>     
        </div>
        <form className="flex items-center px-[20px] mt-4 ">   
            <label className="sr-only">Search</label>
            <div className="relative w-[75%]">
                {/* google map search input */}
                {/* <div className="style_search_ba text-sm rounded-lg outline-none  w-full  p-2.5  bg-white  placeholder-gray-400 placeholder- text-black"> */}
                    <PlacesAutocomplete setSelected={setSelected} />
                {/* </div> */}
                <button onClick={()=>alert('click')} type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <Link href='/login' className='flex items-center ml-4 h-10 bg-black py-[4px] px-[15px] rounded-md  text-white   hover:text-black hover:bg-[#FCD33B]'>
                More filters<ArrowDropDownIcon/>
            </Link>  
        </form>
        {newData.length===0 && isLoaded?
        <div className="no-data">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.42 12.9999C9.5 12.4599 8.88 11.4599 8.88 10.3099C8.88 8.58994 10.27 7.18994 12 7.18994C13.15 7.18994 14.15 7.80994 14.69 8.73994" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.98995 17.8101C4.14995 15.3001 2.80995 12.0901 3.62995 8.49011C5.27995 1.23011 14.57 0.0601072 18.68 4.98011" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L2 22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="no-data-title">No data found within 50 miles</h1>
            <p>Please choose another location or adjust the filter parameters</p>
        </div>:
        <div className="cards-grid mb-[400px]">
            {newData.map((ad)=>(
                <MarketPlaceCard key={ad.id} ad={ad}/>
            ))}
        </div>
        }
        <div className="market-place-footer ">
            <Link className="market-place-footer-logo flex items-center justify-center" href="/">
                <Image
                    src={logo}
                    alt="Adex Logo"
                    width={50}
                    height={50}
                    priority
                />
            </Link>
            <div className="market-place-footer-icons flex items-center">                           

                <Link href="#" className='hover:scale-[1.1]'>
                    <InstagramIcon fontSize='small' sx={{color:'white'}}/>
                </Link>

                <Link href="#" className='hover:scale-[1.1]'>
                    <FacebookIcon fontSize='small' sx={{color:'white'}}/>
                </Link>

                <Link href="#" className='hover:scale-[1.1]'>
                    <TwitterIcon fontSize='small' sx={{color:'white'}}/>
                </Link>

                <Link href="#" className='hover:scale-[1.1]'>
                    <PinterestIcon fontSize='small' sx={{color:'white'}}/>
                </Link>

            </div>
            <p className="market-place-footer-copy text-white">Copyright © 2022 ADEX CONNECT</p>
 
        </div>
    </div>
  )
}


