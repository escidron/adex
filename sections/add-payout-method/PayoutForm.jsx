"use client"
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import LockIcon from '@mui/icons-material/Lock';
import DatePickerComponent from "@/components/datePicker/DatePickerComponent";
import SelectUSState from 'react-select-us-states';
import { ThreeDots } from  'react-loader-spinner'

const inter = Inter({ subsets: ['latin'] })

export default function PayoutForm({ setStripeAccount }) {
  // const [user,setUser] = useContext(UserContext)
  const [bod, setBod] = useState('');
  const [state, setState] = useState('AL');
  const [isPending, setIsPending] = useState(false)

  const validate = values => {
    const errors = {};
    if (!values.idNumber) {
      errors.idNumber = 'Required';
    }

    if (!bod) {
      errors.bod = 'Required';
    }

    if (!values.street) {
      errors.street = 'Required';
    }

    if (!values.city) {
      errors.city = 'Required';
    }
    if (!state) {
      errors.state = 'Required';
    }

    if (!values.zip) {
      errors.zip = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      idNumber: '',
      bod: bod,
      street: '',
      city: '',
      state: state,
      zip: '',
    },
    validate,
    onSubmit: values => {

      setIsPending(true)
        axios.post('http://localhost:8000/api/users/update-address',
          {
            idNumber: values.idNumber,
            bod: bod,
            street: values.street,
            city: values.city,
            state: state,
            zip: values.zip,
          }, {
          withCredentials: true,
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(function (response) {
            setIsPending(false)

            if(response.status==200){
              setStripeAccount(response.data.account)
            }
          })
          .catch(function (error) {
          });
    },
  });
  return (
    <div className={` flex flex-col items-center justify-center min-h-screen py-2  ${inter.className} p-2 `}>
      <form className="text-black z-[91] px-10 py-8 border border-black rounded-lg flex flex-col justify-center items-center  max-w-[500px] h-auto " onSubmit={formik.handleSubmit}>
        <p className=" text-[36px]">Address</p>
        <p className=" text-[18px] font-normal mb-6">Register your bill address</p>
        <div className=" w-full  flex gap-[20px]">
          <div className="w-[60%] relative ">
            <div className="flex">
              <label htmlFor="idNumber" className="block  mb-1">
                ID number
              </label>
            </div>
            <input
              id="idNumber"
              name="idNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idNumber}
              className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
            />
            {formik.touched.idNumber && formik.errors.idNumber ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.idNumber}</div> : null}

          </div>
          <div className="w-[40%] relative max-h-[42px]">
            <div className="flex">
              <label htmlFor="bod" className="block   mb-1">
                Date of Birth
              </label>
            </div>
            <DatePickerComponent
              id='bod'
              setDate={(bod) => setBod(bod)}
              maxHeight='42px'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bod && formik.errors.bod ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.bod}</div> : null}
          </div>
        </div>

        <div className=" mt-4 w-full relative">
          <div className="flex">
            <label htmlFor="street" className="block   mb-1">
              Street address
            </label>
          </div>
          <input
            type="text"
            id="street"
            name="street"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.street}
            className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
          />
          {formik.touched.street && formik.errors.street ? <div className="absolute top-[70px] text-red-600 text-[12px]  font-bold">{formik.errors.street}</div> : null}
        </div>

        <div className=" mt-4 w-full relative">
          <div className="flex">
            <label htmlFor="city" className="block   mb-1">
              City
            </label>
          </div>
          <input
            type="text"
            id="city"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
          />
          {formik.touched.city && formik.errors.city ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.city}</div> : null}
        </div>

        <div className="mt-4 w-full  flex gap-[20px]">
          <div className="w-[70%] relative">
            <div className="flex">
              <label htmlFor="state" className="block   mb-1">
                State
              </label>
            </div>
            <div >
              <SelectUSState
                className={`dropdown w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
                name="state"
                value={state}
                onChange={state => setState(state)} />
            </div>
            {formik.touched.state && formik.errors.state ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.state}</div> : null}
          </div>
          <div className="w-[30%] relative">
            <div className="flex">
              <label htmlFor="zip" className="block   mb-1">
                ZIP code
              </label>
            </div>
            <input
              id="zip"
              name="zip"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip}
              className={`w-full border focus:border-black p-2 rounded-lg outline-none ${inter.className}`}
            />
            {formik.touched.zip && formik.errors.zip ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.zip}</div> : null}
          </div>
        </div>
        <button type="submit" className={`flex gap-2 justify-center min-h-[50px] items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md mt-8  md:mt-7 ${!isPending?'hover:bg-[#FCD33B] hover:text-black':''}  text-lg`}>
          <LockIcon sx={{ fontSize: '18px' }} />
          <div className='style_banner_button_text font-semibold text-[18px]'>
            {isPending?(
              <ThreeDots 
              height="30" 
              width="40" 
              radius="9"
              color="#FCD33B" 
              ariaLabel="three-dots-loading"
              visible={true}
               />
            ):'Continue'}
          </div>
        </button>
        <p className=" mt-5 text-[12px]">Afterwards, you will be redirected to a secure enviroment, where you can input your bank account information.</p>
      </form>
    </div>
  );
}
