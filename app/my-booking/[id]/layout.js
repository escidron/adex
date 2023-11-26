"use client";
export const ListingContext = createContext();
export const MachineStatesContext = createContext();

import { useState, createContext, useEffect } from "react";

export default function ListingLayout({ children }) {

  const [listingProperties, setListingProperties] = useState({});
  
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
