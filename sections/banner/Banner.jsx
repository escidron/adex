"use client"
import axios from "axios"
import Link from "next/link"
import { useContext } from 'react';
import { UserContext } from '../../app/layout';
import { useTransition } from "react"
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function Banner() {
  const [isPending, startTransition] = useTransition()
  const [user,setUser] = useContext(UserContext)
  const router = useRouter();

  const handleRoute = () => {
    if (user.isLogged) {
        router.push('/market-place')
    } else {

        router.push('/login')
    }
}
  
  // const onSubmit = () => {
  //   axios.get('https://test.adexconnect.com/api/users/seller-profile',
  //     {

  //     }, {
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   })
  //     .then(function (response) {

  //       setUser({ ...user, isLogged: true, name: response.data.name })
  //       // router.push('/')
  //     })
  //     .catch(function (error) {
  //     });
  // }
  return (
    <div className={`w-full h-[100vh]  relative ${inter.className}`} >
      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-30'></div>
      <div className='style_banner'></div>
      <div className='style_banner_box h-[300px] text-[34px] w-[90%] flex flex-col justify-center items-center rounded-md p-8 max-w-[400px] bg-white z-8  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                        md:w-[70%] md:max-w-[600px]
                        lg:max-w-[550px] lg:h-[450px] lg:top-[30%] lg:left-[10%] lg:translate-x-0 lg:translate-y-0' >
        <h1 className='text-2xl font-bold z-10
                        md:text-3xl
                        lg:text-[34px]'>Connects with your Community and grow your business</h1>
        <p className='mt-4 lg:mt-6 text-lg z-10'>The platform with the largest network of people looking to help your business grow to a whole new level</p>
        <div onClick={() => startTransition(() => handleRoute())} className="mt-10 ">
          <button className='style_banner_button z-10 bg-black py-[10px] px-[20px] rounded-md   hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200
                                 lg:py-[15px] lg:px-[40px]  '><p className='style_banner_button_text font-medium'>{isPending ? "Navigating...": "Market Place"}</p>
          </button>
        </div>
      </div>
    </div>
  )
}
