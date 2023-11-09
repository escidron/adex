"use client";
export const ListingContext = createContext();
export const MachineStatesContext = createContext();
import axios from "axios";

import { useState, createContext, useEffect } from "react";
import { listingMachine } from "@/utils/listingStatesmachine";
import { useRouter } from "next/navigation";

export default function ListingLayout({ children, params }) {
  const router = useRouter();
  const id = params.id;

  const [stateMachine, setStateMachine] = useState(listingMachine);
  const [userInfo, setUserInfo] = useState(null);
  const [listingData, setListingData] = useState({});

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
    first_available_date: "",
    images: [],
    select_business: "",
    instructions: "",
  });

  
  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
        { id: id },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        const myListing = response.data.data[0];
        setListingData(myListing);
        console.log('myListing',myListing);
        
        setListingProperties((prev) => ({
          ...prev,
          sub_category: myListing.category_id,
          title: myListing.title,
          location: myListing.address,
          latitude: myListing.lat,
          longitude: myListing.long,
          description: myListing.description,
          price: myListing.price,
          date: {
            from: myListing.start_date,
            to: myListing.end_date,
          },
          first_available_date: myListing.first_available_date,
          images: myListing.image,
          select_business: myListing.company_id,
          instructions: myListing.instructions,
          building_asset: myListing.sub_asset_type,
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/list-property`,
      {},
      {
        withCredentials: true,
      }
    )
      .then(function (response) {
        const allCategories = response.data;
        allCategories.map((category) => {
          if (category.id == listingData.category_id) {
            setListingProperties((prev) => ({
              ...prev,
              category: category.parent_id,
            }));
          }
        });
      })
      .catch(function (error) {});
  }, [listingData]);

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/discounts`,
        { id: id },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        const discounts = response.data.discounts
        setListingProperties((prev) => ({
          ...prev,
          discounts: discounts,
        }));

      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <div>
      <ListingContext.Provider
        value={[listingProperties, setListingProperties]}
      >
          {children}
      </ListingContext.Provider>
    </div>
  );
}
