'use client'
import Image from 'next/image'
import Link from 'next/link'

import { useContext,useEffect,useState } from 'react';
import { UserContext } from '../../app/layout';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import GetUserProfile from '@/actions/GetUserProfile';

export default function GetPaid() {
    const [user, setUser] = useContext(UserContext)
    const [userData, setUserData] = useState({});
    const [path, setPath] = useState('');
    const router = useRouter()

    useEffect(() => {
        async function GetInfo() {
            const userData = await GetUserProfile()
            setUserData(userData)
            if( user.isLogged ){
                setPath(`/listing/create/${userData.userType == 1 ? 'select_business' : 'category'}`)
            }else{
                setPath('/login')
            }
        }
        GetInfo();
    }, [user]);

    return (
        <div className='flex justify-around  w-full mx-auto p-[40px] xl:p-[80px]'>
            <div className='flex xl:w-[80%] flex-col lg:flex-row justify-between items-center px-[15px]'>
                <div className='lg:w-[60%] flex flex-col'>
                    <h1 className='text-[34px] lg:text-[51px]'>Get paid to be <span className='text-[#FCD33B] mx-2'>you</span></h1>
                    <p className='mt-5 text-[18px] '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    <p className='mt-5 text-[18px] '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is, making it look like readable English.</p>
                    <p className='mt-5 text-[18px] '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <Button onClick={()=>router.push(path)} className='max-w-[200px] mt-4 flex mx-auto'>Create Listing</Button>
                </div>
                <div className='w-[320px] mt-8 h-full max-h-[400px] flex justify-between '>
                    <Image
                        src='/get-paid-image.png'
                        alt="get-paid image"
                        priority
                        width={2000}
                        height={2000}
                    />
                </div>
            </div>
        </div>
    )
}
