"use client";
import { useState, createContext } from "react";

export const ListingContext = createContext();

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
