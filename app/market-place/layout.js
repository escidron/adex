"use client";
import { useState, createContext } from "react";

export const AllDataContext = createContext();

export default function MarketPlaceLayout({ children }) {

  const [allData, setAllData] = useState([]);

  return (
    <div>
      <AllDataContext.Provider
        value={[allData, setAllData]}
      >
          {children}
      </AllDataContext.Provider>
    </div>
  );
}