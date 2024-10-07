"use client";
import { useState, createContext,useEffect } from "react";
import { useRouter } from 'next/navigation';
import {reverseListingMachine} from '@/utils/reverseListingStateMachine'

export const ListingContext = createContext();
export const MachineStatesContext = createContext();

export default function ReverseListingLayout({ children }) {
  const router = useRouter();

  
  const [stateMachine, setStateMachine] = useState(reverseListingMachine);
  const [userInfo, setUserInfo] = useState(null);
  const [reverseListingProperties, setReverseListingProperties] = useState({
    currentStep: 0,
    category: "",
    sub_category: "",
    building_asset: "13",
    media_types: "",
    location: "",
    latitude: 0,
    longitude: 0,
    description: "",
    isDraft : false,
    otherListingType: '',
    digitalPriceType: ''

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
        const res = await response.json();
        setUserInfo(res);
        if(res.userType == '1'){
          router.push('/reverse-listing/create/select_business')
          setStateMachine((prev) => ({ ...prev, currentState: 'select_business',totalSteps: 12 }))

        }else{
          router.push('/reverse-listing/create/category')
        }
      }
    }
    GetUserProfile();
  }, []);

  useEffect(() => {
    async function GetUserProfile() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/get-draft`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        if(res.data){
          setReverseListingProperties(res.data)
        }
      }
    }
    GetUserProfile();
  }, []);

  return (
    <div>
      <ListingContext.Provider
        value={[reverseListingProperties, setReverseListingProperties]}
      >
        <MachineStatesContext.Provider value={[stateMachine, setStateMachine]}>
          {children}
        </MachineStatesContext.Provider>
      </ListingContext.Provider>
    </div>
  );
}
