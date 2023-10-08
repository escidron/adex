"use client"
import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../app/layout';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/adex-logo-white-yellow.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import toast, { Toaster } from "react-hot-toast";
import Notifications from '../notification/Notifications';
import { Bell, BookmarkCheck, Building2, HelpCircle, List, LogIn, LogOut, Mail, Menu, MessageSquare, Store, User2, UserPlus2 } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] })

export default function NavBar() {
    const pathname = usePathname();
    const [user, setUser] = useContext(UserContext)
    const [showNotifications, setshowNotifications] = useState(false)
    const [userData, setUserData] = useState({});
    const router = useRouter();

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
                console.log('entrou no external account navbar', res.data)
                setUser((prev) => ({ ...prev, hasPayout: true }))

            }
        }
    }

    useEffect(() => {
        axios.post('https://test.adexconnect.com/api/users/notifications',
            {}, {
            withCredentials: true,
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
                setUserData(res)
            }
        }
        GetUserProfile();
    }, [user]);


    const logout = () => {
        toast.dismiss()
        axios.post('https://test.adexconnect.com/api/users/logout',
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
        <div className={`bg-black sm:bg-green-200 md:bg-yellow-400 lg:bg-green-600 xl:bg-blue-400 2xl:bg-black w-full h-[90px] text-slate-50 text-lg 
                        flex justify-center lg:justify-start items-center py-4 px-[40px] xl:px-[80px] relative style_navbar md:h-[90px] xl:justify-center ${inter.className} `}>

            <div><Toaster /></div>
            {/* web screen */}
            <section className='hidden md:flex  md:justify-between md:items-center w-[500px] lg:w-[600px] xl:max-w-[50%]'>
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
                <Link href='/market-place' className='hover:text-[#FCD33B] cursor-pointer'>ADEX Market Place</Link>
                <Link href={user.isLogged ? '/listing' : '/login'} className='hover:text-[#FCD33B]'>Listing</Link>
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
                                    />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-[#FCD33B] text-black font-bold flex justify-center items-center border-2 border-[#FCD33B]'>{user.name.substring(0, 1).toUpperCase()}</div>
                                )
                            }
                        </div>
                    </div>
                )
                : pathname !== '/login' && pathname !== '/sign-up' && user.checkLogin ?
                    (<div className='hidden h-[90px]
                                    md:absolute md:top-0 md:right-[100px] md:flex md:justify-between items-center'>
                        <div onClick={() => router.push('/login')} className=' cursor-pointer hidden lg:flex items-center z-10 ml-4 h-10 bg-[#FCD33B] py-[4px] px-[15px] rounded-md  text-black   hover:text-[#FCD33B]  hover:bg-black text-md'>
                            <p className='style_banner_button_text font-semibold text-[16px]'>Login</p>
                        </div>
                        <div onClick={() => router.push('/sign-up')} className='hidden cursor-pointer lg:flex items-center z-10 ml-4 h-10 border-[#FCD33B] border-2 text-[#FCD33B] py-[4px] px-[15px] rounded-md    hover:bg-[#FCD33B]  hover:text-black text-md'>
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
                            Sign up
                        </Link>
                        <Link href="/my-profile?tab=1" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <User2 size={20} />
                            Profile
                        </Link>
                        {
                            userData.user_type == '1' && (
                                <Link href="/my-profile?tab=6" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                                    <Building2 size={20} />
                                    My Companies
                                </Link>
                            )
                        }
                        <Link href="/my-profile?tab=5&sub-tab=0" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <List size={20} />
                            My listing
                        </Link>
                        <Link href="/my-profile?tab=5&sub-tab=1" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <BookmarkCheck size={20} />
                            My Bookings
                        </Link>
                        <Link href="/messages" className={`${user.isLogged ? 'flex' : 'hidden'} gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black`}>
                            <MessageSquare size={20} />
                            Messages
                        </Link>
                        <Link href="/market-place" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <Store size={20} />
                            ADEX market Place
                        </Link>
                        <Link href={`${user.isLogged ? '/listing' : 'login'}`} className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <List size={20} />
                            Create a Listing
                        </Link>
                        <Link href="/how-it-works" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <HelpCircle size={20} />
                            How it Works
                        </Link>
                        <Link href="/contact-us" className="flex gap-2 items-center w-full px-4 py-2  cursor-pointer hover:bg-[#FCD33B] hover:text-black">
                            <Mail size={20} />
                            Contact us
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
