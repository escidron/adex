"use client";
import { useState, createContext,useEffect } from "react";
import { listingMachine } from "@/utils/listingStatesmachine";
import { useRouter } from 'next/navigation';


export const ListingContext = createContext();
export const MachineStatesContext = createContext();

export default function ListingLayout({ children }) {
  const router = useRouter();

  
  const [stateMachine, setStateMachine] = useState(listingMachine);
  const [userInfo, setUserInfo] = useState(null);
  const [listingProperties, setListingProperties] = useState({
    currentStep: 0,
    category: "",
    sub_category: "",
    building_asset: "13",
    title: "",
    location: "",
    latitude: 0,
    longitude: 0,
    description: "",
    price: "",
    discounts: [],
    date: "",
    first_available_date:"",
    images: [],
    isDraft : false,
    select_business: '',
    instructions:''
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
          router.push('/listing/create/select_business')
          setStateMachine((prev) => ({ ...prev, currentState: 'select_business',totalSteps: 12 }))

        }else{
          router.push('/listing/create/category')
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
          setListingProperties(res.data)
        }
      }
    }
    GetUserProfile();
  }, []);

  return (
    <div>
      <ListingContext.Provider
        value={[listingProperties, setListingProperties]}
      >
        <MachineStatesContext.Provider value={[stateMachine, setStateMachine]}>
          {children}
        </MachineStatesContext.Provider>
      </ListingContext.Provider>
    </div>
  );
}
