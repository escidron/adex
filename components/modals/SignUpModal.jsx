"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from "@/app/layout";
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import { ThreeDots } from 'react-loader-spinner'

const inter = Inter({ subsets: ['latin'] })

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.accountType) {
    errors.accountType = 'Required';
  }

  if (!values.password2) {
    errors.password2 = 'Required';

  } else if (values.password2 !== values.password) {
    errors.password2 = 'passwords must be equal'
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default function SignUpModal({ setShowSignUpModal }) {
  const [user, setUser] = useContext(UserContext)
  const [accountType, setAccountType] = useState('');
  const [selected, setSelected] = useState(null);
  const [isPending, setIsPending] = useState(false)

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
      accountType: ''
    },
    validate,
    onSubmit: values => {
      setIsPending(true)

      axios.post('http://localhost:8000/api/users',
        {
          name: `${values.firstName} ${values.lastName}`,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          password: values.password,
          accountType: accountType
        }, {
          withCredentials: true,
          headers: {
          'content-type': 'application/json'
        }
      })
        .then(function (response) {
          setUser({ ...user, isLogged: true, name: values.firstName, showLoginOptions: false })
          router.push('/')
          setIsPending(false)
          setShowSignUpModal(false)
        })
        .catch(function (error) {
        });
    },
  });

  const handleAccountType = (e) => {
    const id = e.currentTarget.id
    if (id == accountType) {

      formik.values.accountType = ''
      setAccountType('');
    } else {

      formik.values.accountType = id
      setAccountType(id);
    }
  }
  return (
    <div className=" style_login flex flex-col items-center justify-center min-h-screen py-2  fixed z-[99] top-0 left-0">
      <div className='absolute top-0 left-0 w-full h-[100vh]  bg-black z-90 opacity-70'></div>
      <div onClick={()=>setShowSignUpModal(false)} className="z-[91] absolute top-[40px] cursor-pointer">
                <Image
                    src='/adex-logo-white-yellow.png'
                    alt="Adex Logo"
                    width={70}
                    height={70}
                    priority
                />
            </div>
      <form className=" z-[91] flex flex-col justify-center items-center text-black font-[400] w-[400px] h-auto mt-[95px]" onSubmit={formik.handleSubmit}>
        <p className="text-white text-[36px]">Register</p>
        <p className="text-white text-[18px] font-normal mb-6 mt-2">Register to access the <span className="text-[#FCD33B]">ADEX</span> Market Place</p>

        <div className=" w-full relative">
          <div className="flex">
            <label htmlFor="firstName" className="block text-white  mb-1">
              First Name
            </label>
            {formik.touched.firstName && formik.errors.firstName ? <div className="ml-4 text-red-600 font-bold">{formik.errors.firstName}</div> : null}

          </div>
          <input
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className={`w-full border-2 focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
          />
        </div>

        <div className=" mt-2 w-full relative">
          <div className="flex">
            <label htmlFor="lastName" className="block text-white  mb-1">
              Last Name
            </label>
            {formik.touched.lastName && formik.errors.lastName ? <div className="ml-4 text-red-600  font-bold">{formik.errors.lastName}</div> : null}
          </div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className={`w-full border-2 focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
          />
        </div>
        <div className=" mt-2 w-full relative">
          <div className="flex">
            <label htmlFor="email" className="block text-white  mb-1">
              Email
            </label>
            {formik.touched.email && formik.errors.email ? <div className="ml-4 text-red-600 font-bold">{formik.errors.email}</div> : null}
          </div>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full border-2 focus:border-black  p-2 rounded-lg outline-none ${inter.className}`}
          />
        </div>
        <div className=" mt-2 w-full relative">
          <div className="flex">
            <label htmlFor="phone" className="block text-white  mb-1">
              Phone Number
            </label>
            {formik.touched.phone && formik.errors.phone ? <div className="ml-4 text-red-600 font-bold">{formik.errors.phone}</div> : null}
          </div>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={`w-full border-2 focus:border-black  p-2 rounded-lg outline-none ${inter.className}`}
          />
        </div>
        <div className=" mt-2 w-full relative">
          <div className="flex">
            <label htmlFor="password" className="block text-white  mb-1">
              Password
            </label>
            {formik.touched.password && formik.errors.password ? <div className="ml-4 text-red-600 font-bold">{formik.errors.password}</div> : null}
          </div>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`w-full border-2 focus:border-black  p-2 rounded-lg outline-none ${inter.className}`}
          />
        </div>
        <div className=" mt-2 w-full relative">
          <div className="flex">
            <label htmlFor="password2" className="block text-white  mb-1">
              Confirm Password
            </label>
            {formik.touched.password2 && formik.errors.password2 ? <div className="ml-4 text-red-600 font-bold">{formik.errors.password2}</div> : null}
          </div>
          <input
            type="password"
            id="password2"
            name="password2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
            className={`w-full border-2 focus:border-black  p-2 rounded-lg outline-none ${inter.className}`}
          />
        </div>
        <div className=" mt-2 w-full relative">
          <div className="flex">
            <label htmlFor="phone" className="block text-white  mb-1">
              Account Type
            </label>
            {formik.touched.accountType && formik.errors.accountType ? <div className="ml-4 text-red-600 font-bold">{formik.errors.accountType}</div> : null}

          </div>
          <div className="flex gap-2">
            <div
              type="text"
              id="1"
              name="account-1"
              value={formik.values.accountType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={(e) => handleAccountType(e)}
              className={`
              w-[48%] 
              flex 
              justify-center 
              items-center 
              p-2 
              rounded-lg 
              outline-none 
              cursor-pointer
              hover:text-black 
              hover:bg-[#FCD33B] 
              ${accountType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'} 
              ${inter.className}`}
            >Business
            </div>
            <div
              type="text"
              id="2"
              name="account-2"
              value={formik.values.accountType}

              onClick={(e) => handleAccountType(e)}
              className={`
                w-[48%] 
                flex 
                justify-center  
                items-center 
                p-2 rounded-lg 
                outline-none 
                hover:text-black hover:bg-[#FCD33B] 
                cursor-pointer
                ${accountType == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}   
                ${inter.className}`}
            >Individual
            </div>
          </div>
        </div>
        <button type="submit" className={`z-10 bg-[#FCD33B] font-[600] py-[8px] text-black px-[30px] rounded-md mt-8 w-full md:mt-7 ${!isPending?'hover:bg-black hover:text-[#FCD33B]':''}  text-lg`}>
            {isPending ? (
              <ThreeDots
                height="30"
                width="40"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            ) : 'Sign Up'}

        </button>
        <p className="text-white mt-5">Have an account? <Link href='/login' className="text-[#FCD33B] hover:opacity-80">Login</Link></p>
      </form>
    </div>
  );
}