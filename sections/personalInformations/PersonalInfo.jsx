"use client"

import axios from 'axios';
import DropImageArea from '@/components/dropImageArea/DropImageArea';

import { useState, useEffect } from 'react';
import { Divider, Skeleton } from '@mui/material';
import { Edit, Eye, EyeOff } from 'lucide-react';
import { TextAreaEditor } from '@/components/textarea/TextAreaEditor';
import { Preview } from '@/components/textarea/TextAreaReader';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch"
import PlataformDropdown from './_components/PlataformDropdown';
import PlataformCards from './_components/PlataformCards';
import GetSocialMediaInfo from '@/actions/GetSocialMediaInfo';
import SetIsContentCreator from '@/actions/SetIsContentCreator';
import toast from 'react-hot-toast';
import PreferencesDropdown from './_components/PreferencesDropdown';
import PreferencesCards from './_components/PreferencesCards';
import GetAudiencePreference from '@/actions/GetAudiencePreference';
import RemovePreference from '@/actions/RemovePreference';
import RemovePlataform from '@/actions/RemovePlataform';

export default function PersonalInfo() {
  const [currentInfo, setCurrentInfo] = useState('');
  const [refresh, setRefresh] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [gallery, setGallery] = useState([]);
  const [images, setImages] = useState([]);
  const [remove, setRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isContentCreator, setIsContentCreator] = useState(false);
  const [plataforms, setPlataforms] = useState([]);
  const [preferences, setPreferences] = useState([]);

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
    cityIsPublic: '0',
    userType: '0',
    isContentCreator: false
  });

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
        setUser(res)
        setIsLoading(false)

      }
    }
    GetUserProfile();
  }, [refresh]);

  useEffect(() => {

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-image-gallery`,
      {},
      {
        withCredentials: true,
      })
      .then(function (response) {
        setImages(response.data.galleryWithImages[0].company_gallery)
      })
      .catch(function (error) {
        console.log(error)
      });


  }, [gallery]);


  const removeImage = async (remove) => {
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/remove-gallery-image`,
      { remove },
      {
        withCredentials: true,
      })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
      });
  }
  useEffect(() => {

    if (images.length > 0) {

      axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/image-gallery`,
        {
          images: images
        },
        {
          withCredentials: true,
        })
        .then(function (response) {
          setImages([])
          setGallery([...gallery, images])
          setRefresh(!refresh)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }, [refetch]);

  useEffect(() => {
    async function fetchData() {
      const response = await GetSocialMediaInfo();
      if (response) {
        setPlataforms(response)
      }
    }
    fetchData();

  }, []);
  useEffect(() => {
    async function fetchData() {
      const response = await GetAudiencePreference();
      if (response) {
        setPreferences(response)
      }
    }
    fetchData();

  }, []);

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
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/update-user-profile`,
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
        cityIsPublic: user.cityIsPublic

      }, {
      withCredentials: true,
    })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  const handlePublicInfo = (info) => {

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/update-user-profile`,
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        profession: user.profession,
        sex: user.sex,
        handle: user.handle,
        city: user.city,
        handleIsPublic: info == 'handle' && user.handleIsPublic == '1' ? '0' : info == 'handle' && user.handleIsPublic == '0' ? '1' : user.handleIsPublic,
        professionIsPublic: info == 'profession' && user.professionIsPublic == '1' ? '0' : info == 'profession' && user.professionIsPublic == '0' ? '1' : user.professionIsPublic,
        sexIsPublic: info == 'sex' && user.sexIsPublic == '1' ? '0' : info == 'sex' && user.sexIsPublic == '0' ? '1' : user.sexIsPublic,
        bioIsPublic: info == 'bio' && user.bioIsPublic == '1' ? '0' : info == 'bio' && user.bioIsPublic == '0' ? '1' : user.bioIsPublic,
        cityIsPublic: info == 'city' && user.cityIsPublic == '1' ? '0' : info == 'city' && user.cityIsPublic == '0' ? '1' : user.cityIsPublic,

      }, {
      withCredentials: true,
    })
      .then(function (response) {
        setRefresh(!refresh)

      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const handleDescription = (description) => {
    setUser({ ...user, bio: description })
  }
  const handleIsContentCreator = async () => {
    const response = await SetIsContentCreator(!user.isContentCreator)
    if (response) {
      setUser({ ...user, isContentCreator: !user.isContentCreator })
      return
    }
    toast.error("Something went wrong")
  }

  const handleDeletePlataform = async (id) => {
    const isRemoved = await RemovePlataform(id)
    if (isRemoved) {
      const newPlataforms = plataforms.filter(item => item.name != id)
      setPlataforms(newPlataforms)
    }
    console.log('id', id)
  }
  const handleDeletePreference = async (id) => {
    const isRemoved = await RemovePreference(id)
    if (isRemoved) {
      const newPreferences = preferences.filter(item => item != id)
      setPreferences(newPreferences)
    }
    console.log('id', id)
  }

  return (
    <div className={` flex flex-col items-center  min-h-screen py-2 overflow-y-auto invisible_scroll_bar`}>
      <div className="flex flex-col items-center rounded-lg p-6 w-[100%] md:w-[80%] max-w-[650px] ">
        <h1 className="text-[30px]">Personal Information</h1>
        <div className={`mt-2 w-full flex flex-col gap-3 `}>

          <div className="border rounded-md py-3 px-4 flex justify-between items-center gap-4 min-h-[74px] w-full">
            {
              currentInfo === 'name' ? (
                <>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='First Name'
                    value={user.name != 'null' ? user.name : ''}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                  />

                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>First Name</p>
                    {
                      isLoading ? (

                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600 max-w-[300px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{user.name != 'null' && user.name ? user.name : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div onClick={() => { setCurrentInfo('name') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                    <Edit color='gray' size={18} />
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

                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>Last Name</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600 max-w-[300px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{user.lastName != 'null' && user.lastName ? user.lastName : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div onClick={() => { setCurrentInfo('lastname') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                    <Edit color='gray' size={18} />
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
                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>Email</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600 max-w-[300px] overflow-hidden overflow-ellipsis whitespace-nowrap '>{user.email != 'null' && user.email ? user.email : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div onClick={() => { setCurrentInfo('email') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                    <Edit color='gray' size={18} />
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
                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>Phone Number</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600'>{user.phone != 'null' && user.phone ? user.phone : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div onClick={() => { setCurrentInfo('phone') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                    <Edit color='gray' size={18} />
                  </div>
                </>
              )
            }
          </div>
          <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

          <div className='mb-2 flex gap-3 font-[600] text-[18px] items-center'>
            <EyeOff size={16} color='gray' />
            <h1 className='text-[16px]'>Marking this information &quot;public&quot; means it is visible to all</h1>
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
                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>User Handle</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600 max-w-[260px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{user.handle != 'null' && user.handle ? user.handle : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => handlePublicInfo('handle')} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      {
                        user.handleIsPublic == '1' ? (

                          <Eye size={16} color='gray' />
                        ) : (
                          <EyeOff size={16} color='gray' />
                        )
                      }
                    </div>
                    <div onClick={() => { setCurrentInfo('handle') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      <Edit color='gray' size={18} />
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
                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>City</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600 max-w-[260px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{user.city != 'null' && user.city ? user.city : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => handlePublicInfo('city')} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      {
                        user.cityIsPublic == '1' ? (

                          <Eye size={16} color='gray' />
                        ) : (
                          <EyeOff size={16} color='gray' />
                        )
                      }
                    </div>
                    <div onClick={() => { setCurrentInfo('city') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      <Edit color='gray' size={18} />
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
                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>Profession</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600 max-w-[260px] overflow-hidden overflow-ellipsis whitespace-nowrap' >{user.profession != 'null' && user.profession ? user.profession : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => handlePublicInfo('profession')} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      {
                        user.professionIsPublic == '1' ? (

                          <Eye size={16} color='gray' />
                        ) : (
                          <EyeOff size={16} color='gray' />
                        )
                      }
                    </div>
                    <div onClick={() => { setCurrentInfo('profession') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      <Edit color='gray' size={18} />
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
                    className={`w-full flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${user.sex == 1 ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                  >Male
                  </div>
                  <div
                    type="text"
                    id={2}
                    name="sex-2"
                    value={user.sex}
                    onClick={(e) => handleSex(e)}
                    className={`w-full flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${user.sex == 2 ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                  >Female
                  </div>
                  <div
                    type="text"
                    id={3}
                    name="sex-3"
                    value={user.sex}
                    onClick={(e) => handleSex(e)}
                    className={`w-full flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${user.sex == 3 ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                  >Other
                  </div>
                  <Button onClick={submit}>Save</Button>

                </>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>Sex</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'10px'} className='mt-2' />
                      ) : (
                        <p className='font-[300] text-gray-600'>{user.sex != 'null' && user.sex ? (user.sex == 1 ? 'Male' : user.sex == 2 ? 'Female' : user.sex == 3 ? 'Other' : '') : 'Not Provided'}</p>
                      )
                    }
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => handlePublicInfo('sex')} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      {
                        user.sexIsPublic == '1' ? (

                          <Eye size={16} color='gray' />
                        ) : (
                          <EyeOff size={16} color='gray' />
                        )
                      }
                    </div>
                    <div onClick={() => { setCurrentInfo('sex') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      <Edit color='gray' size={18} />
                    </div>
                  </div>
                </>
              )
            }
          </div>

          <div className={`border rounded-md py-3 px-4 flex justify-between  gap-4 min-h-[74px] ${currentInfo === 'bio' ? 'h-[300px] items-start' : 'h-fit items-start'} `}>
            {
              currentInfo === 'bio' ? (
                <div className='flex flex-col-reverse justify-end  md:flex-row w-full h-full gap-2'>
                  <div className='w-full'>

                    <TextAreaEditor
                      value={user.bio != 'null' ? user.bio : ''}
                      onChange={(description) => handleDescription(description)}
                    />
                  </div>
                  <Button onClick={submit}>Save</Button>
                </div>
              ) : (
                <>
                  <div className='w-full'>
                    <p className='font-[600]'>Who I Am</p>
                    {
                      isLoading ? (
                        <Skeleton variant="rounded" width={'80%'} height={'60px'} className='mt-2' />
                      ) : (
                        <div className='w-full'>
                          <Preview value={user.bio != 'null' && user.bio ? user.bio : 'Not Provided'} heigth={200} autoHeigth={true} />
                        </div>
                      )
                    }
                  </div>

                  <div className='flex gap-2'>
                    <div onClick={() => handlePublicInfo('bio')} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      {
                        user.bioIsPublic == '1' ? (

                          <Eye size={16} color='gray' />
                        ) : (
                          <EyeOff size={16} color='gray' />
                        )
                      }
                    </div>
                    <div onClick={() => { setCurrentInfo('bio') }} className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                      <Edit color='gray' size={18} />
                    </div>
                  </div>

                </>
              )
            }
          </div>

          <div className='w-full flex justify-between items-center mt-8'>
            <p className='font-[600]'>Are you an Influencer / Content Creator?</p>
            <Switch checked={user.isContentCreator} onCheckedChange={handleIsContentCreator} />
          </div>
          {
            user.isContentCreator && (
              <>
                <p className='font-[500] text-[24px] mt-4'>Plataforms & Followers</p>
                <PlataformDropdown setPlataforms={(newPlataform) => setPlataforms(newPlataform)} plataforms={plataforms} />
                <PlataformCards plataforms={plataforms} handleDeletePlataform={(id) => handleDeletePlataform(id)} />

                <p className='font-[500] text-[24px] mt-4'>Niche / Genre</p>
                <PreferencesDropdown setPreferences={(newPreference) => setPreferences(newPreference)} preferences={preferences} />
                <PreferencesCards preferences={preferences} handleDeletePreference={(id) => handleDeletePreference(id)} />
              </>
            )
          }

        </div>

        <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '20px', marginBottom: '20px' }} />

        <h1 className='text-[30px] mb-4 mt-6'>Image Gallery</h1>

        {/* <GalleryImage gallery={gallery} /> */}
        <div className='w-full max-w-[800px] flex flex-col items-center  '>
          <div className='w-full h-full '>
            <div className='h-[400px]  mt-2 mb-[200px] w-full'>
              <DropImageArea
                images={images}
                setImages={(image) => setImages(image)}
                setRefetch={(toggle) => setRefetch(toggle)}
                isInPersonalProfile={true}
                setRemove={(item) => removeImage(item)}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
