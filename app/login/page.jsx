"use client"
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit login form data here
  };

  return (
    <div className=" style_login flex flex-col items-center justify-center min-h-screen py-2 mt-[-90px] relative">
      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>

      <form className=" z-[91] flex flex-col justify-center items-center  w-[400px] h-auto"  onSubmit={handleSubmit}>
        <p className="text-white text-[36px]">Login</p>
        <p className="text-white text-[18px] font-normal">Sign in to <span className="text-[#FCD33B]">continue.</span></p>
        
        <div className="mb-4 mt-4 w-full">
          <label htmlFor="email" className="block text-white  mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full border  p-3 rounded-lg outline-none"
            required
          />
        </div>
        
        <div className=" mt-4 w-full">
          <label htmlFor="password" className="block text-white  mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border  p-3 rounded-lg outline-none"
            required
          />
        </div>
        <Link href='/hello' className="mt-2 ml-auto text-[#FCD33B] hover:opacity-80">Forgot Password ?</Link>
        <button className='z-10 bg-[#FCD33B] py-[8px] px-[30px] rounded-md mt-4  md:mt-5 hover:bg-black hover:text-[#FCD33B] text-lg
                                  lg:mt-10 '><p className='style_banner_button_text font-semibold text-184px]'>Login</p>
        </button>
        <p className="text-white mt-5">Don&apos;t have an account? <Link href='/hello' className="text-[#FCD33B] hover:opacity-80">Sign Up</Link></p>
      </form>
    </div>
  );
}