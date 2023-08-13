"use client"
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../app/layout';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import nouser from '../../public/nouser.png'
import logo from '../../public/adex-logo-white-yellow.png'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ForumIcon from '@mui/icons-material/Forum';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import toast, { Toaster } from "react-hot-toast";
import Notifications from '../notification/Notifications';

const inter = Inter({ subsets: ['latin'] })

export default function NavBar() {
    const pathname = usePathname();
    const [user, setUser] = useContext(UserContext)
    const [showNotifications, setshowNotifications] = useState(false)
    const [userData, setUserData] = useState({});

    const router = useRouter();

    useEffect(() => {
        async function GetUserProfile() {
            const response = await fetch(
                "https://test.adexconnect.com/api/users/user-profile",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                console.log('res',res)
                setUserData(res)
            }
        }
        GetUserProfile();
    }, []);

    async function hasPayoutMethod() {
        const response = await fetch(
            "https://test.adexconnect.com/api/users/external-account",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (response.status === 200) {
            const res = await response.json()
            if (res.data) {
                // setHasPayout((prev) => (true));
                setUser((prev) => ({ ...prev, hasPayout: true }))

            }
        }
    }

    useEffect(() => {
        axios.post('https://test.adexconnect.com/api/users/notifications',
            {}, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                setUser((prev) => ({ ...prev, notificationQuantity: response.data.notifications.length, notifications: response.data.notifications }))
                //   setUser((prev) => ({ ...prev, notifications: response.data.notifications }))
            })
            .catch(function (error) {
                console.log(error)
            });


    }, []);
    useEffect(() => {
        const handleClick = (event) => {

            // Handle your click logic here
            setshowNotifications(false)
            if (user.showLoginOptions) {
                setUser((prev) => ({ ...prev, showLoginOptions: false }))
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [showNotifications, user]);

    useEffect(() => {
        async function autoLogin() {
            const response = await fetch("https://test.adexconnect.com/api/users/autologin", {
                method: "GET",
                credentials: "include",
            });
            if (response.status === 200) {
                const currentUser = await response.json()
                setUser((prev) => ({ ...prev, name: currentUser.name, isLogged: true, checkLogin: false, showLoginOptions: false, image: currentUser.image, userId: currentUser.userId }));
                hasPayoutMethod()
            } else {
                console.log('response error', response)
            }
        }
        autoLogin();
    }, []);

    const handleRoute = () => {
        if (user.isLogged) {
            router.push('/market-place')
        } else {
            router.push('/login')
        }
    }
    const logout = () => {
        toast.dismiss()

        axios.post('https://test.adexconnect.com/api/users/logout',
            {

            }, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                setUser({ ...user, isLogged: false, name: '', checkLogin: true })
                router.push('/')
                toast.success(response.data.message, {
                    duration: 3000,
                    style: {
                        fontWeight: 500
                    }
                })
            })
            .catch(function (error) {
            });
    }

    //sm:bg-red-700 md:bg-blue-700 lg:bg-green-700 xl:bg-gray-500 2xl:bg-yellow-500
    console.log('haspayout', user.hasPayout)
    return (
        <div className={`bg-black   w-full h-[90px] text-slate-50 text-lg flex justify-between items-center py-4 px-[40px] lg:px-[80px] relative style_navbar
                        md:h-[90px]
                        lg:justify-center ${inter.className}
                        `}>

            <div><Toaster /></div>
            {/* web screen */}
            <section className='hidden 
                                md:flex  md:justify-between md:items-center w-[500px]
                                lg:w-[600px]
                                xl:max-w-[50%]'>
                <Link href="/how-it-works" className='hover:text-[#FCD33B]  '>How it Work</Link>
                <Link href="/contact-us" className='hover:text-[#FCD33B]'>Contact Us</Link>
                <div className='md:h-[50px] md:w-[50px] 
                                lg:h-[60px] lg:w-[60px]
                                xl:h-[70px] xl:w-[70px]'>
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Adex Logo"
                            width={70}
                            height={70}
                            priority
                        />
                    </Link>
                </div>
                <p onClick={handleRoute} className='hover:text-[#FCD33B] cursor-pointer'>ADEX Market Place</p>
                <Link href={user.isLogged ? '/listing' :  '/login' } className='hover:text-[#FCD33B]'>Listing</Link>
            </section>
            {user.isLogged
                ? (
                    <div className='hidden cursor-pointer 
                            md:flex items-center 
                            lg:absolute t0p-0 lg:right-[40px]
                            xl:top-0 xl:right-[80px]
                            transition
                            duration-500
                            ease-linear
                            h-full
                            '>
                        <div className='ml-4 relative flex justify-end items-center h-full'
                            onClick={() => {
                                setUser((prev) => ({ ...prev, showLoginOptions: false }))
                                setshowNotifications(true)
                            }}

                        >
                            <NotificationsRoundedIcon sx={{ fontSize: '24px', marginRight: '10px' }} />
                            {user.notificationQuantity > 0 ? (
                                <p className='absolute top-8 right-[10px] flex justify-center items-center w-[13px] h-[13px] bg-red-600 rounded-full text-[11px]'>{user.notificationQuantity}</p>
                            ) : ('')}
                        </div>
                        <div className='flex items-center h-full ml-4'
                            onClick={() => {
                                setshowNotifications(false)
                                setUser((prev) => ({ ...prev, showLoginOptions: true }))
                            }}
                        >
                            <Image
                                src={user.image ? user.image : nouser}
                                alt="user image"
                                width={30}
                                height={30}
                                priority
                            />
                            <p className='ml-2 md:text-sm lg:text-base'>Hi, {user.name}</p>
                            <ArrowDropDownIcon />
                        </div>


                        {user.showLoginOptions ?
                            <div
                                className="absolute top-[95px] lg:top-[38px] xl:top-[90px] right-[-45px] w-[200px] text-sm font-medium text-white bg-black rounded-b-lg"
                            >
                                <Link href="/my-profile?tab=1" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                                    <PersonRoundedIcon sx={{ marginRight: '4px', fontSize: '16px' }} />
                                    Profile
                                </Link>
                                {
                                    userData.user_type == '1' && (
                                        <Link href="/my-profile?tab=6" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                                            <ApartmentIcon sx={{ marginRight: '4px', fontSize: '16px' }} />
                                            My Companies
                                        </Link>
                                    )
                                }
                                <Link href="/my-profile?tab=5&sub-tab=0" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                                    <ListAltIcon sx={{ marginRight: '4px', fontSize: '16px' }} />
                                    My listing
                                </Link>
                                <Link href="/my-profile?tab=5&sub-tab=1" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                                    <BookIcon sx={{ marginRight: '4px', fontSize: '16px' }} />
                                    My Bookings
                                </Link>
                                <Link href="/messages" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                                    <ForumIcon sx={{ marginRight: '4px', fontSize: '16px' }} />
                                    Messages
                                </Link>
                                <Link onClick={logout} href="/" className="flex gap-2 items-center w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                                    <LogoutIcon sx={{ marginRight: '4px', fontSize: '16px' }} />
                                    Logout
                                </Link>
                            </div> :
                            ""}

                        {showNotifications ?
                            <div className="absolute top-[95px] lg:top-[38px] xl:top-[90px]  w-[350px] right-0 text-sm font-medium text-white bg-black rounded-b-lg "
                                onClick={() => setshowNotifications(true)}
                            >
                                <Notifications />
                            </div> :
                            ""}
                    </div>
                )
                : pathname !== '/login' && pathname !== '/sign-up' && user.checkLogin ?
                    (<div className='hidden h-[90px]
                                    md:absolute md:top-0 md:right-[100px] md:flex md:justify-between items-center'>
                        <div onClick={() => router.push('/login')} className=' cursor-pointer hidden xl:flex items-center z-10 ml-4 h-10 bg-[#FCD33B] py-[4px] px-[15px] rounded-md  text-black   hover:text-[#FCD33B]  hover:bg-black text-md'>
                            <p className='style_banner_button_text font-semibold text-[16px]'>Login</p>
                        </div>
                        <div onClick={() => router.push('/sign-up')} className='hidden cursor-pointer xl:flex items-center z-10 ml-4 h-10 border-[#FCD33B] border-2 text-[#FCD33B] py-[4px] px-[15px] rounded-md    hover:bg-[#FCD33B]  hover:text-black text-md'>
                            <p className='style_banner_button_text font-semibold text-[16px]'>Sign Up</p>
                        </div>
                    </div>) : ''

            }

            {/* mobile screen */}
            <div className='md:hidden'>
                <Link href='/'>
                    <Image
                        src={logo}
                        alt="Adex Logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
            </div>
            <div className='cursor-pointer lg:hidden flex items-center justify-self-end' onClick={() => setUser((prev) => ({ ...prev, showLoginOptions: !prev.showLoginOptions }))} >
                <MenuIcon fontSize='large' />
            </div>
            {user.showLoginOptions ?
                <div onMouseOver={() => setUser((prev) => ({ ...prev, showLoginOptions: true }))} onMouseLeave={() => setUser((prev) => ({ ...prev, showLoginOptions: false }))} className="md:hidden absolute top-[65px] lg:top-[38px] xl:top-[38px] right-[1px] md:right-[5px] lg:right-[1px] w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <div onClick={() => router.push('/login')} className="block rounded-t-lg w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Login
                    </div>
                    <div onClick={() => router.push('/sign-up')} className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Sign Up
                    </div>
                    <Link href="/my-profile?tab=1" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Profile
                    </Link>
                    <Link href="/how-it-works" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        How it Works
                    </Link>
                    <Link href="/contact-us" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Contact us
                    </Link>
                    <Link href="/listing" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Create a Listing
                    </Link>
                    <Link href="/market-place" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        ADEX market Place
                    </Link>
                    <Link onClick={logout} href="/" className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        <LogoutIcon fontSize='small' sx={{ marginRight: '2px' }} />
                        Logout
                    </Link>
                </div> :
                ""}
        </div>
    )
}
