"use client"
import { useContext,useState,useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname();
    // const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [user,setUser] = useContext(UserContext)
    const router = useRouter();
    useEffect(() => {
        async function autoLogin() {
        const response = await fetch("http://localhost:8000/api/users/autologin", {
            method: "GET",
            credentials: "include",
        });
        if (response.status === 200) {
            const user = await response.json()
            setUser((prev)=>({...prev,name:user.name,isLogged:true,checkLogin:false,showLoginOptions:false}));
        } else {
        }
        }
        autoLogin();
    }, []);
    
    const handleRoute = ()=>{
        if(user.isLogged){
            router.push('/market-place') 
        }else{

            router.push('/login')
        }
    }
    const logout = ()=>{
        axios.post('http://localhost:8000/api/users/logout',
        {

      }, {
          withCredentials: true,
          headers: {
            'content-type': 'application/json'
          }})
        .then(function (response) {

          setUser({...user,isLogged:false,name:'',checkLogin:true})
            router.push('/login')
        })
        .catch(function (error) {
        });
    }

    return (
        <div className='bg-black w-full h-[90px] text-slate-50 text-lg flex justify-between items-center py-4 px-[40px] lg:px-[80px] relative style_navbar
                        md:h-[90px]
                        lg:justify-center'>

            {/* web screen */}
            <section className='hidden 
                                md:flex  md:justify-between md:items-center w-[500px]
                                lg:w-[600px]
                                xl:max-w-[50%]'>
                <Link href="/" className='hover:text-[#FCD33B]'>How it Work</Link>
                <Link href="/" className='hover:text-[#FCD33B]'>Contact Us</Link>
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
                <Link href="/" className='hover:text-[#FCD33B]'>Listing</Link>
            </section>
            {user.isLogged
                ? (
                    <div onMouseOver={()=> setUser((prev)=>({...prev,showLoginOptions:true}))} onMouseLeave={()=> setUser((prev)=>({...prev,showLoginOptions:false}))}  className='hidden cursor-pointer  p-1
                            md:flex items-center 
                            lg:absolute lg:top-[30px] lg:right-[40px]
                            xl:top-[26px] xl:right-[80px]'>
                        <Image 
                        
                            src={nouser}
                            alt="user image"
                            width={30}
                            height={30}
                            priority
                        />
                        <p className='ml-2 md:text-sm lg:text-base'>Hi, {user.name}</p>
                        <ArrowDropDownIcon />
                        {user.showLoginOptions?                     
                            <div  onMouseOver={()=> setUser((prev)=>({...prev,showLoginOptions:true}))} onMouseLeave={()=> setUser((prev)=>({...prev,showLoginOptions:false}))} className="absolute top-[38px] right-[1px] w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <Link href="/" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                    Profile
                                </Link>
                                <Link href="/" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                    Messages
                                </Link>
                                <Link onClick={logout} href="/" className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                <LogoutIcon fontSize='small' sx={{marginRight:'2px'}}/>
                                    Logout
                                </Link>
                            </div>:
                        ""}

                    </div>
                )
                :   pathname !=='/login' && pathname!=='/signup' && user.checkLogin?
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
