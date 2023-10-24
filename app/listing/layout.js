"use client";
import { useState, createContext } from "react";

export const ListingContext = createContext();

export default function ListingLayout({ children }) {
  const [listingProperties, setListingProperties] = useState({
    currentStep: 0,
    category: '',
    sub_category: '',
    building_asset:'13',
    title: '',
    location:'',
    latitude:0,
    longitude:0,
    description:'',
    price: '',
    discounts:[],
    date:'',
    images:[]
  });
  return (
    <div>
      <ListingContext.Provider value={[listingProperties, setListingProperties]}>
        {children}
      </ListingContext.Provider>
    </div>
  );
}
