
"use client"
import { useEffect,useState } from 'react';
import FolderComponent from '@/components/folder/FolderComponent'
import GetUserProfile from '@/actions/GetUserProfile';


export default function Profilepage() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function GetInfo() {
        const userData = await GetUserProfile()
        setUserData(userData)
    }
    GetInfo();
}, []);

  return (
        <main> 
            <FolderComponent userType={userData.userType}/>
        </main>
  )
}
