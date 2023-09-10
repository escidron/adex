"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function PersonalInfo() {
  const [refresh, setRefresh] = useState(false)
  const [currentInfo, setCurrentInfo] = useState('');

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    profession: '',
    sex: '',
    handle: '',
    handleIsPublic: '0',
    professionIsPublic: '0',
    sexIsPublic: '0',
    bioIsPublic: '0',
    city: '',
    cityIsPublic:'0'
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
  }, [refresh]);

  const handleSex = (e) => {
    const id = e.currentTarget.id
    if (id !== user.sex) {
      setUser({ ...user, sex: id })
    } else {
      setUser({ ...user, sex: '' })
    }
  }

  const submit = () => {
    setCurrentInfo('')
    axios.post('https://test.adexconnect.com/api/users/update-user-profile',
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        profession: user.profession,
        sex: user.sex,
        handle: user.handle,
        handleIsPublic: user.handleIsPublic,
        professionIsPublic: user.professionIsPublic,
        sexIsPublic: user.sexIsPublic,
        bioIsPublic: user.bioIsPublic,
        city: user.city,
        cityIsPublic :user.cityIsPublic


      }, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log('response', response)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const handlePublicInfo = (info) => {
    axios.post('https://test.adexconnect.com/api/users/update-user-profile',
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        profession: user.profession,
        sex: user.sex,
        handle: user.handle,
        city:user.city,
        handleIsPublic: info == 'handle' && user.handleIsPublic == '1' ? '0' : info == 'handle' && user.handleIsPublic == '0' ? '1' : user.handleIsPublic,
        professionIsPublic: info == 'profession' && user.professionIsPublic == '1' ? '0' : info == 'profession' && user.professionIsPublic == '0' ? '1' : user.professionIsPublic,
        sexIsPublic: info == 'sex' && user.sexIsPublic == '1' ? '0' : info == 'sex' && user.sexIsPublic == '0' ? '1' : user.sexIsPublic,
        bioIsPublic: info == 'bio' && user.bioIsPublic == '1' ? '0' : info == 'bio' && user.bioIsPublic == '0' ? '1' : user.bioIsPublic,
        cityIsPublic: info == 'city' && user.cityIsPublic == '1' ? '0' : info == 'city' && user.cityIsPublic == '0' ? '1' : user.cityIsPublic,
      }, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log('response', response)
        setRefresh(!refresh)

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
                    placeholder='Name'
                    value={user.name != 'null' ? user.name : ''}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                    <p className='font-[300] text-gray-600'>{user.name != 'null' && user.name ? user.name : 'Not Provided'}</p>
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
                    placeholder='Last Name'
                    value={user.lastName != 'null' ? user.lastName : ''}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
                    <p className='font-[300] text-gray-600'>{user.lastName != 'null' && user.lastName ? user.lastName : 'Not Provided'}</p>
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
                    placeholder='Email'
                    value={user.email != 'null' ? user.email : ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                    <p className='font-[300] text-gray-600'>{user.email != 'null' && user.email ? user.email : 'Not Provided'}</p>
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
                    placeholder='Phone'
                    value={user.phone != 'null' ? user.phone : ''}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                    <p className='font-[300] text-gray-600'>{user.phone != 'null' && user.phone ? user.phone : 'Not Provided'}</p>
                  </div>
                  <div onClick={() => setCurrentInfo('phone')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                    <p className='text-gray-600 '>Edit</p>
                    <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                  </div>
                </>
              )
            }
          </div>
          <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

          <div className='mb-2 flex gap-3 font-[600] text-[18px] items-center'>
            <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
            <h1>You can decide if buyers can visualize these informations </h1>
          </div>
          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px] ">
            {
              currentInfo === 'handle' ? (
                <>
                  <input
                    type="text"
                    id="handle"
                    name="handle"
                    placeholder='User Handle'
                    value={user.handle != 'null' && user.handle ? user.handle : ''}
                    onChange={(e) => setUser({ ...user, handle: e.target.value })}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>User Handle</p>
                    <p className='font-[300] text-gray-600'>{user.handle != 'null' && user.handle ? user.handle : 'Not Provided'}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => setCurrentInfo('handle')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                      <p className='text-gray-600 '>Edit</p>
                      <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                    </div>
                    <div className="flex gap-1 rounded-xl border items-center justify-between py-2 px-2 cursor-pointer hover:border-black" onClick={() => handlePublicInfo('handle')}>
                      {
                        user.handleIsPublic == '1' ? (

                          <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        ) : (
                          <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        )
                      }
                    </div>
                  </div>
                </>
              )
            }
          </div>
          
          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px] ">
            {
              currentInfo === 'city' ? (
                <>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder='City'
                    value={user.city != 'null' ? user.city : ''}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>City</p>
                    <p className='font-[300] text-gray-600'>{user.city != 'null' && user.city ? user.city : 'Not Provided'}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => setCurrentInfo('city')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                      <p className='text-gray-600 '>Edit</p>
                      <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                    </div>
                    <div className="flex gap-1 rounded-xl border items-center justify-between py-2 px-2 cursor-pointer hover:border-black" onClick={() => handlePublicInfo('city')}>
                      {
                        user.cityIsPublic == '1' ? (

                          <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        ) : (
                          <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        )
                      }
                    </div>
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px] ">
            {
              currentInfo === 'profession' ? (
                <>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    placeholder='Profession'
                    value={user.profession != 'null' ? user.profession : ''}
                    onChange={(e) => setUser({ ...user, profession: e.target.value })}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Profession</p>
                    <p className='font-[300] text-gray-600'>{user.profession != 'null' && user.profession ? user.profession : 'Not Provided'}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => setCurrentInfo('profession')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                      <p className='text-gray-600 '>Edit</p>
                      <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                    </div>
                    <div className="flex gap-1 rounded-xl border items-center justify-between py-2 px-2 cursor-pointer hover:border-black" onClick={() => handlePublicInfo('profession')}>
                      {
                        user.professionIsPublic == '1' ? (

                          <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        ) : (
                          <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        )
                      }
                    </div>
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px] ">
            {
              currentInfo === 'sex' ? (
                <>
                  <div
                    type="text"
                    id={1}
                    name="sex-1"
                    value={user.sex}
                    onClick={(e) => handleSex(e)}
                    className={`w-full flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${user.sex == 1 ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Male
                  </div>
                  <div
                    type="text"
                    id={2}
                    name="sex-2"
                    value={user.sex}
                    onClick={(e) => handleSex(e)}
                    className={`w-full flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${user.sex == 2 ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Female
                  </div>
                  <div
                    type="text"
                    id={3}
                    name="sex-3"
                    value={user.sex}
                    onClick={(e) => handleSex(e)}
                    className={`w-full flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${user.sex == 3 ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Other
                  </div>
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Sex</p>
                    <p className='font-[300] text-gray-600'>{user.sex != 'null' && user.sex ? (user.sex == 1 ? 'Male' : user.sex == 2 ? 'Female' : user.sex == 3 ? 'Other' : '') : 'Not Provided'}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => setCurrentInfo('sex')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                      <p className='text-gray-600 '>Edit</p>
                      <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                    </div>
                    <div className="flex gap-1 rounded-xl border items-center justify-between py-2 px-2 cursor-pointer hover:border-black" onClick={() => handlePublicInfo('sex')}>
                      {
                        user.sexIsPublic == '1' ? (

                          <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        ) : (
                          <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        )
                      }
                    </div>
                  </div>
                </>
              )
            }
          </div>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px] h-auto">
            {
              currentInfo === 'bio' ? (
                <>
                  <textarea
                    type="text"
                    id="bio"
                    name="bio"
                    placeholder='About you'
                    value={user.bio != 'null' ? user.bio : ''}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full border text-black p-3 min-h-[200px] rounded-lg outline-none focus:border-black"
                  />
                  <button onClick={submit} className='style_banner_button  mx-auto z-10 bg-black py-[4px] px-[20px] h-10 rounded-md  hover:bg-[#FCD33B] hover:text-black text-lg transition ease-linear duration-200'>
                    <p className='style_banner_button_text font-medium '>Save</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className='font-[600]'>Who I Am</p>
                    <p className='font-[300] text-gray-600'>{user.bio != 'null' && user.bio ? user.bio : 'Not Provided'}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => setCurrentInfo('bio')} className='flex gap-1 rounded-xl border items-center justify-between py-2 px-4 cursor-pointer hover:border-black'>
                      <p className='text-gray-600 '>Edit</p>
                      <EditIcon sx={{ fontSize: '16px', color: 'gray' }} />
                    </div>
                    <div className="flex gap-1 rounded-xl border items-center justify-between py-2 px-2 cursor-pointer hover:border-black" onClick={() => handlePublicInfo('bio')}>
                      {
                        user.bioIsPublic == '1' ? (

                          <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        ) : (
                          <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                        )
                      }
                    </div>
                  </div>
                </>
              )
            }
          </div>

        </div>
      </div>
    </div >
  );
}
