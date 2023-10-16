

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/adex-logo-white-yellow.png'

export default function MarketPlaceFooter({isHidden,isAbsolute}) {
  return (
    <div className={`${isHidden > 0 ? 'flex' : 'flex'} mt-auto col-span-full w-full bg-[#252525] h-[200px] flex-col items-center justify-center ${isAbsolute ? 'absolute left-0 bottom-0' : 'rounded-md'}`}>
    <Link className="h-[60px] aspect-square flex items-center justify-center" href="/">
        <Image
            src={logo}
            alt="Adex Logo"
            width={2000}
            height={2000}
            priority
        />
    </Link>
    <div className="flex items-center justify-around w-[160px]">

        <Link href="#" className='hover:scale-[1.1]'>
            <InstagramIcon fontSize='small' sx={{ color: 'white' }} />
        </Link>

        <Link href="#" className='hover:scale-[1.1]'>
            <FacebookIcon fontSize='small' sx={{ color: 'white' }} />
        </Link>

        <Link href="#" className='hover:scale-[1.1]'>
            <TwitterIcon fontSize='small' sx={{ color: 'white' }} />
        </Link>

        <Link href="#" className='hover:scale-[1.1]'>
            <PinterestIcon fontSize='small' sx={{ color: 'white' }} />
        </Link>

    </div>
    <p className="text-white mt-[10px]">Copyright © 2022 ADEX CONNECT</p>

</div>
  )
}

