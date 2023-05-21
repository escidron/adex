"use client"
import React from 'react'
import axios from "axios"
export default function Banner() {

  const onSubmit = ()=>{
    axios.get('http://localhost:8000/api/users/profile',
          {

        }, {
            headers: {
              'content-type': 'application/json'
            }})
          .then(function (response) {
            console.log(response)
            console.log('deu certo')
            setUser({...user,isLogged:true,name:response.data.name})
            // router.push('/')
          })
          .catch(function (error) {
            console.log('errrr',error.response.data);
          });
  }
  return (
    <div className='w-full h-[100vh]  relative'>
        <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-30'></div>
        <div className='style_banner'></div>
        <div className='style_banner_box h-[300px] w-[90%] flex flex-col justify-center items-center rounded-md p-8 max-w-[400px] bg-white  z-8  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                        md:w-[70%] md:max-w-[600px]
                        lg:max-w-[550px] lg:h-[450px] lg:top-[30%] lg:left-[10%] lg:translate-x-0 lg:translate-y-0'>
          <h1 className='text-2xl font-bold z-10
                        md:text-3xl
                        lg:text-4xl'>Connects with your community and grow your business</h1>
          <p className='mt-4 lg:mt-6 text-lg z-10'>The platform with the largest network of people looking to help your business grow to a whole new level</p>
          <button onClick={()=>onSubmit()} className='style_banner_button z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                 lg:py-[15px] lg:px-[40px] lg:mt-10 '><p className='style_banner_button_text font-medium'>Create Listing</p>
          </button>
        </div>
    </div>
  )
}
