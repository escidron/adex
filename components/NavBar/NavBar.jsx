"use client"
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/adex-logo-white-yellow.png'
import Notifications from '../notification/Notifications';
import toast, { Toaster } from "react-hot-toast";

import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../app/layout';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Bell, BookmarkCheck, Building2, HelpCircle, List, LogIn, LogOut, Mail, Menu, MessageSquare, Store, User2, UserPlus2, Wallet } from 'lucide-react';
import { Button } from '../ui/button';

export default function NavBar() {
    const pathname = usePathname();
    const [user, setUser] = useContext(UserContext)
    const [showNotifications, setshowNotifications] = useState(false)
    const [userData, setUserData] = useState({});
    const [finishRequests, setFinishRequests] = useState(false);
    const router = useRouter();

    async function hasPayoutMethod() {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/external-account`,
            {
                method: "POST",
                credentials: "include",
            }
        );
        if (response.status === 200) {
            const res = await response.json()
            if (res.data) {
                setUser((prev) => ({ ...prev, hasPayout: true }))

            }
        }
    }

    useEffect(() => {

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/notifications`,
            {}, {
            withCredentials: true,
        })
            .then(function (response) {
                setUser((prev) => ({ ...prev, notificationQuantity: response.data.notifications.length, notifications: response.data.notifications }))
            })
            .catch(function (error) {
                console.log(error)
            });


    }, [userData]);

    useEffect(() => {
        const handleClick = (event) => {

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/autologin`, {
                method: "GET",
                credentials: "include",
            });
            if (response.status === 200) {
                const currentUser = await response.json()
                setUser((prev) => ({ ...prev, name: currentUser.name, isLogged: true, checkLogin: false, showLoginOptions: false, image: currentUser.image, userId: currentUser.userId,userType:currentUser.userType }));
                hasPayoutMethod()
                setFinishRequests(true)
            } else {
                console.log('error', response)
                setFinishRequests(true)
            }
        }
        autoLogin();
    }, [userData]);

    useEffect(() => {
        async function GetUserProfile() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                setUserData(res)
            }
        }
        GetUserProfile();
    }, [finishRequests]);

    const logout = () => {
        toast.dismiss()
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/logout`,
            {

            }, {
            withCredentials: true,

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
                setUser((prev) => ({ ...prev, showLoginOptions: false }))

            })
            .catch(function (error) {
            });
    }
    return (
        <div className={`bg-black  ${(pathname.includes('listing') || pathname.includes('booking')) ? 'hidden' : 'flex'} w-full h-[90px] text-slate-50 text-lg 
                        flex justify-center lg:justify-start items-center py-4 px-[40px] xl:px-[80px] relative style_navbar md:h-[90px] xl:justify-center  `}>

            <div><Toaster /></div>
            {/* web screen */}
            <section className='hidden md:flex  md:justify-between md:items-center w-[500px] lg:w-[600px] xl:max-w-[50%]'>
                <Link href='/market-place' className='hover:text-[#FCD33B] cursor-pointer'>ADEX Market Place</Link>
                <Link href={user.isLogged ? `/listing/create/${user.userType == 1 ? 'select_business' : 'category'}` : '/login'} className='hover:text-[#FCD33B]'>Create Listing</Link>

                <div className='md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px] xl:h-[70px] xl:w-[70px]'>
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
                <Link href="/how-it-works" className='hover:text-[#FCD33B]  '>How It Works</Link>
                <Link href="/contact-us" className='hover:text-[#FCD33B]'>Contact Us</Link>
            </section>
            {user.isLogged
                ? (
                    <div className=' cursor-pointer 
                            flex items-center  absolute top-0 right-4 lg:right-[80px]
                            transition
                            duration-500
                            ease-linear
                            h-full
                            '>
                        <div className='ml-auto relative flex justify-end items-center h-full'
                            onClick={() => {
                                setUser((prev) => ({ ...prev, showLoginOptions: false }))
                                setshowNotifications(true)
                            }}

                        >
                            <Bell />
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
                            {
                                user.image ? (

                                    <Image
                                        src={user.image}
                                        alt="user image"
                                        width={30}
                                        height={30}
                                        priority
                                        className='w-8 h-8 rounded-full'
                                    />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-[#FCD33B] text-black font-bold flex justify-center items-center border-2 border-[#FCD33B]'>{user.name.substring(0, 1).toUpperCase()}</div>
                                )
                            }
                        </div>
                    </div>
                )
                : pathname !== '/login' && pathname !== '/sign-up' && user.checkLogin && finishRequests &&
                (<div className='hidden h-[90px] md:absolute md:top-0 md:right-[100px] md:flex md:justify-between items-center'>
                    <Button className='hidden lg:flex ml-4' variant='secondary' onClick={() => router.push('/login')}>Login</Button>
                    <Button className='hidden lg:flex ml-4' variant='outline2' onClick={() => router.push('/sign-up')}>Sign Up</Button>
                </div>)

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
            <div className={`cursor-pointer absolute top-[30px] right-8 lg:hidden flex items-center justify-self-end ${user.isLogged ? 'md:hidden' : ''}`} onClick={() => setUser((prev) => ({ ...prev, showLoginOptions: !prev.showLoginOptions }))} >
                {
                    !user.isLogged && (
                        <Menu size={30} />

                    )


                }
            </div>
            {user.showLoginOptions &&
                <div className="absolute top-[90px] right-0  w-[200px] text-sm font-medium text-white bg-black rounded-b-lg">
                    <>
                        <Link href="/login" className={`${user.isLogged ? 'hidden' : 'flex'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <LogIn size={20} />
                            Login
                        </Link>
                        <Link href="/sign-up" className={`${user.isLogged ? 'hidden' : 'flex'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <UserPlus2 size={20} />
                            Sign Up
                        </Link>
                        <Link href="/my-profile?tab=1" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <User2 size={20} />
                            Profile
                        </Link>
                        {
                            user.userType == '1' && (
                                <Link href="/my-profile?tab=6" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                                    <Building2 size={20} />
                                    My Companies
                                </Link>
                            )
                        }
                        <Link href="/my-profile?tab=5&sub-tab=0" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <List size={20} />
                            My Listings
                        </Link>
                        <Link href="/my-profile?tab=5&sub-tab=1" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <BookmarkCheck size={20} />
                            My Bookings
                        </Link>
                        {
                            user.userType == '2' && (
                                <Link href="/my-profile?tab=4" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                                    <Wallet size={20} />
                                    My Wallet
                                </Link>
                            )
                        }

                        <Link href="/messages" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <MessageSquare size={20} />
                            Messages
                        </Link>
                        <Link href="/market-place" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <Store size={20} />
                            ADEX Market Place
                        </Link>
                        <Link href={user.isLogged ? `/listing/create/${user.userType == 1 ? 'select_business' : 'category'}` : '/login'} className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <List size={20} />
                            Create Listing
                        </Link>
                        <Link href="/how-it-works" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <HelpCircle size={20} />
                            How It Works
                        </Link>
                        <Link href="/contact-us" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <Mail size={20} />
                            Contact Us
                        </Link>
                        <Link onClick={logout} href="/" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <LogOut size={20} />
                            Logout
                        </Link>
                    </>


                </div>
            }

            {showNotifications &&
                <div className="absolute top-[90px]  w-[350px] right-0 text-sm font-medium text-white bg-black rounded-b-lg "
                    onClick={() => setshowNotifications(true)}
                >
                    <Notifications />
                </div>
            }
        </div>
    )
}
