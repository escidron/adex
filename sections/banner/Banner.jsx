"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";




export default function Banner() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter();

  return (
    <div className={`w-full h-[100vh] relative `} >


      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-20'></div>
      {/* <div className='style_banner'></div> */}
      <Image
        src='/adex-home-banner.jpg'
        alt="banner image"
        priority={true}
        width={3000}
        height={3000}
        className=' h-full w-full object-cover mt-[80px]'
      />
      <div className=' max-h-[350px] text-[34px] w-[90%] flex flex-col justify-center items-center rounded-md p-8 max-w-[400px] bg-white z-8  absolute top-[200px] md:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                        md:w-[70%] md:max-w-[600px]
                        lg:max-w-[550px] lg:h-[450px] lg:top-[30%] lg:left-[10%] lg:translate-x-0 lg:translate-y-0' >
        <h1 className='text-xl font-bold z-10 md:text-3xl lg:text-[32px]'>Connect with your Community </h1>
        <h1 className='text-xl font-bold z-10 md:text-3xl lg:text-[32px]'>and grow your business.</h1>
        <div className="mt-10 ">
          <Button className='h-[60px] text-[20px]' disabled={isPending} size='lg' onClick={() => {
            setIsPending(true)
            router.push('/market-place')
          }}>
            {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
            Market Place
          </Button>
        </div>
      </div>
    </div>
  )
}
