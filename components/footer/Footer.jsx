"use client"
import Link from 'next/link'
import Image from 'next/image'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Separator } from '../ui/separator';



export default function Footer() {
    return (
        <div className="h-[calc(100vh-90px)] bg-[#252525] flex flex-col justify-between items-center mt-[200px]">
            <div className='w-full'>
                <div className='w-full mt-[50px] flex flex-col items-center justify-center'>
                    <Separator className='w-[80%]' />
                    <div className=' my-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full md:w-[650px] justify-center'>
                        <Link href="/how-it-works" className='hover:scale-[1.1]'>
                            <p className='text-white mt-2 text-center'>How It Works</p>
                        </Link>

                        <Link href="/contact-us" className='hover:scale-[1.1]'>
                            <p className='text-white mt-2 text-center'>Contact Us</p>
                        </Link>

                        <Link href="#" className='hover:scale-[1.1]'>
                            <p className='text-white mt-2 text-center'>Terms Of Use</p>
                        </Link>

                        <Link href="/market-place" className='hover:scale-[1.1]'>
                            <p className='text-white mt-2 text-center ml-4'>ADEX Market Place</p>
                        </Link>
                    </div>
                    <Separator className='w-[80%]' />
                </div>
                <div className='w-full mt-[20px] flex flex-col items-center justify-center'>
                    <div className='w-[80px] '>
                        <Image
                            src='/adex-logo-white-yellow.png'
                            alt="Adex Logo"
                            width={2000}
                            height={2000}
                            quality={100}
                            className='w-full x'
                        />
                    </div>
                    <p className='w-[80%] mt-3 p-1 md:w-[600px] text-white text-[13px]'>At ADEX, our unwavering commitment is to provide a top-tier experience for every user. We believe in inclusivity and accessibility, ensuring that our platform is welcoming and useful to individuals of all backgrounds and abilities. We're not just any marketplace; we aspire to be a marketplace like no other. Our dedication to excellence and innovation sets us apart, guaranteeing a unique and exceptional experience for all who engage with us.</p>
                    <div className="mt-4 flex items-center w-[120px] justify-around">

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
                    <p className={`mt-4 text-white `}>Copyright © 2023 ADEX CONNECT</p> 

                </div>
            </div>
            {/* <Link className="h-[180px] flex items-center justify-center" href="/">
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
            <p className={`mt-3 text-white `}>Copyright © 2022 ADEX CONNECT</p> */}
            <div className='w-full max-h-[400px]'>
                <Image
                    src='/footer-image.png'
                    alt="Adex Logo"
                    width={2000}
                    height={2000}
                    quality={100}
                    className='w-full object-cover h-[250px] sm:h-[300px] md:h-[350px] lg:h-[360px] '
                />
            </div>
        </div>
    )
}
