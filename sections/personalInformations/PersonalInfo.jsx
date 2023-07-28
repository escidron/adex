"use client"

import { useState,useEffect } from 'react';
import { Inter } from 'next/font/google'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] })

export default function PersonalInfo() {
  const [currentInfo, setCurrentInfo] = useState('');
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    phone:'',
    bio:''
});
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
        console.log(res)
        setUser(res)
      }
    }
    GetUserProfile();
  }, []);


  const submit = ()=>{
    setCurrentInfo('')
    axios.post('https://test.adexconnect.com/api/users/update-user-profile',
    { name: user.name,
      lastName:user.lastName,
      email:user.email,
      phone:user.phone,
      bio:user.bio 
    
    }, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(function (response) {
      console.log('response',response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }
  return (
    <div className={` flex flex-col items-center  min-h-screen py-2 `}>
      <div className="
          flex 
          flex-col
          items-center
          rounded-lg 
          p-6
          w-1/2
          max-w-[600px]
          min-w-[400px]
        ">
        <h1 className="text-[30px]">Personal Informations</h1>
        <div className={`mt-2 w-full flex flex-col gap-3 ${inter.className}`}>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px]">
            {
              currentInfo === 'name' ? (
                <>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name != 'null' ?user.name:''}
                    onChange={(e)=>setUser({...user,name:e.target.value})}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Name</p>
                    <p className='font-[300] text-gray-600'>{user.name != 'null' && user.name?user.name:'Not Provided'}</p>
                  </div>
                  <div onClick={() => setCurrentInfo('name')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                    <p className='text-gray-600 '>Edit</p>
                    <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px]">
            {
              currentInfo === 'lastname' ? (
                <>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={user.lastName != 'null' ?user.lastName:''}
                    onChange={(e)=>setUser({...user,lastName:e.target.value})}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Last Name</p>
                    <p className='font-[300] text-gray-600'>{user.lastName != 'null' && user.lastName?user.lastName:'Not Provided'}</p>
                  </div>
                  <div onClick={() => setCurrentInfo('lastname')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                    <p className='text-gray-600 '>Edit</p>
                    <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px]">
            {
              currentInfo === 'email' ? (
                <>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={user.email != 'null' ?user.email:''}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Email</p>
                    <p className='font-[300] text-gray-600'>{user.email != 'null' && user.email?user.email:'Not Provided'}</p>
                  </div>
                  <div onClick={() => setCurrentInfo('email')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                    <p className='text-gray-600 '>Edit</p>
                    <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px]">
            {
              currentInfo === 'phone' ? (
                <>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={user.phone != 'null' ?user.phone:''}
                    onChange={(e)=>setUser({...user,phone:e.target.value})}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Phone Number</p>
                    <p className='font-[300] text-gray-600'>{user.phone != 'null' && user.phone?user.phone:'Not Provided'}</p>
                  </div>
                  <div onClick={() => setCurrentInfo('phone')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                    <p className='text-gray-600 '>Edit</p>
                    <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px]">
            {
              currentInfo === 'bio' ? (
                <>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={user.bio != 'null'?user.bio:''}
                    onChange={(e)=>setUser({...user,bio:e.target.value})}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Bio</p>
                    <p className='font-[300] text-gray-600'>{user.bio != 'null' && user.bio?user.bio:'Not Provided'}</p>
                  </div>
                  <div onClick={() => setCurrentInfo('bio')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                    <p className='text-gray-600 '>Edit</p>
                    <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                  </div>
                </>
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
}
