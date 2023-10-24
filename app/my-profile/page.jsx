
"use client"
import { useEffect,useState } from 'react';
import FolderComponent from '@/components/folder/FolderComponent'


export default function Profilepage() {
  const [userData, setUserData] = useState({});

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
}, []);

  return (
        <main> 
            <FolderComponent userType={userData.user_type}/>
        </main>
  )
}
