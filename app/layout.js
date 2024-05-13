"use client";

import NavBar from "@/components/NavBar/NavBar";
import { createContext, useState } from "react";
import { useEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Abel } from "next/font/google";
import favicon from "../public/static/favicon.ico";
const inter = Inter({ subsets: ["latin"] });
const abel = Abel({ subsets: ["latin"], weight: ["400"] });

import dotenv from "dotenv";
dotenv.config();

export const UserContext = createContext();

export default function RootLayout({ children }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [user, setUser] = useState({
    isLogged: false,
    checkLogin: true,
    showLoginOptions: false,
    name: "",
    image: "",
    userId: null,
    notificationQuantity: 0,
    notifications: [],
    hasPayout: false,
    rating: null,
    userType: null,
  });

  useEffect(() => {
    async function autoLogin() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/autologin`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const currentUser = await response.json();
        setUser((prev) => ({
          ...prev,
          name: currentUser.name,
          isLogged: true,
          checkLogin: false,
          showLoginOptions: false,
          image: currentUser.image,
          userId: currentUser.userId,
          rating: currentUser.rating,
          userType: currentUser.userType,
        }));
      } else {
        console.log("error", response);
      }
    }
    autoLogin();
  }, []);
  return (
    <html lang="en">
      <head>
        <title>ADEX Connect</title>
        <link rel="icon" href={favicon.src} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
          async
        />
      </head>
      {/* <body className={`${abel.className} ${showLoginModal || showSignUpModal?'overflow-hidden':''}`} > */}
      <body className={`${inter.className}`}>
        <UserContext.Provider value={[user, setUser]}>
          <NavBar
            setShowLoginModal={(toggle) => setShowLoginModal(toggle)}
            showLoginModal={showLoginModal}
            setShowSignUpModal={(toggle) => setShowSignUpModal(toggle)}
            showSignUpModal={showSignUpModal}
            showForgotPasswordModal={showForgotPasswordModal}
            setShowForgotPasswordModal={(toggle) =>
              setShowForgotPasswordModal(toggle)
            }
          />

          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}
