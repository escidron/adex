"use client"
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { usePathname } from 'next/navigation';

import Link from 'next/link'
import Image from 'next/image'
import nouser from '../../public/nouser.png'
import logo from '../../public/adex-logo-white-yellow.png'
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export default function NavBar() {
    const [user,setUser] = useContext(UserContext)
    const pathname = usePathname();
    console.log(pathname)

    return (
        <div className='bg-black w-full h-[90px] text-slate-50 text-lg flex justify-between items-center py-4 px-[40px] lg:px-[80px] relative style_navbar
                        md:h-[90px]
                        lg:justify-center'>

            {/* web screen */}
            <section className='hidden 
                                md:flex  md:justify-between md:items-center w-[500px]
                                lg:w-[600px]
                                xl:max-w-[50%]'>
                <Link href="/hello">How it Work</Link>
                <Link href="/hello">Contact Us</Link>
                <div className='md:h-[50px] md:w-[50px] 
                                lg:h-[60px] lg:w-[60px]
                                xl:h-[70px] xl:w-[70px]'>
                    <Image
                        src={logo}
                        alt="Adex Logo"
                        width={70}
                        height={70}
                        priority
                    />
                </div>
                <Link href="/hello">ADEX Market Place</Link>
                <Link href="/hello">Listing</Link>
            </section>
            {user.isLogged
                ? (
                    <div className='hidden 
                            md:flex items-center 
                            lg:absolute lg:top-[30px] lg:right-[40px]
                            xl:top-[30px] xl:right-[80px]'>
                        <Image
                            src={nouser}
                            alt="user image"
                            width={30}
                            height={30}
                            priority
                        />
                        <p className='ml-2 md:text-sm lg:text-base'>Hi, {user.name}</p>
                    </div>
                )
                :   pathname !=='/login' && pathname!=='/signup'?
                        ( <div className='hidden h-[90px]
                                    md:absolute md:top-0 md:right-[100px] md:flex md:justify-between items-center'>
                        <Link href='/login' className='hidden xl:flex items-center z-10 ml-4 h-10 bg-[#FCD33B] py-[4px] px-[15px] rounded-md  text-black   hover:text-white ext-md'>
                            <p className='style_banner_button_text font-semibold text-[16px]'>Login</p>
                        </Link>
                        <Link href='/signup' className='hidden xl:flex items-center z-10 ml-4 h-10 border-[#FCD33B] border-2 text-[#FCD33B] py-[4px] px-[15px] rounded-md    hover:bg-[#FCD33B]  hover:text-black text-md'>
                            <p className='style_banner_button_text font-semibold text-[16px]'>Sign Up</p>
                        </Link>
                    </div>):''
                    
            }

            {/* mobile screen */}
            <div className='md:hidden'>
                <Image
                    src={logo}
                    alt="Adex Logo"
                    width={50}
                    height={50}
                    priority
                />
            </div>
            <div className=' md:hidden flex items-center justify-self-end'>
                <MenuIcon fontSize='large' />
            </div>

        </div>
    )
}
