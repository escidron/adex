"use client";
export const ListingContext = createContext();
export const MachineStatesContext = createContext();
import axios from "axios";

import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ListingLayout({ children, params }) {
  const router = useRouter();
  const id = params.id;

  const [listingData, setListingData] = useState({});

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
