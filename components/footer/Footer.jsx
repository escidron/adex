"use client"
import Link from 'next/link'
import Image from 'next/image'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';



export default function Footer() {
  return (
    <div className="h-[320px] lg:h-[400px] bg-[#252525] flex flex-col justify-center items-center mt-[200px]">
        <Link className="h-[180px] flex items-center justify-center" href="/">
            <Image
                src='/adex-logo-white-yellow.png'
                alt="Adex Logo"
                width={180}
                height={180}

                className='w-[100px] xl:w-[180px] lg:w-[140px]'
            />
        </Link>
        <div className="flex items-center w-[120px] justify-around">                           

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
        <p className={`mt-3 text-white `}>Copyright © 2022 ADEX CONNECT</p>

    </div>
  )
}
