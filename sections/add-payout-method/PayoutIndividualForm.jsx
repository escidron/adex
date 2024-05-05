"use client"
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import SelectUSState from 'react-select-us-states';
import toast, { Toaster } from "react-hot-toast";
import MaskedInput from 'react-maskedinput';

import ImageLoader from "@/components/ImageLoader/ImageLoader";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DobComponent from "@/components/datePicker/DobComponent";


export default function PayoutIndividualForm({ setHasAccount }) {
  const [dob, setdob] = useState('');
  const [state, setState] = useState('AL');
  const [isPending, setIsPending] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [images, setImages] = useState([]);

  const validate = values => {
    const errors = {};
    if (!values.idNumber) {
      errors.idNumber = 'Required';
    }

    if (!dob) {
      errors.dob = 'Required';
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

    if (images.length == 0) {
      errors.images = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      idNumber: '',
      dob: dob,
      street: '',
      city: '',
      state: state,
      zip: '',
      image: images
    },
    validate,
    onSubmit: values => {
      toast.dismiss()

      setIsPending(true)
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/create-user-connect-account`,
        {
          idNumber: values.idNumber.replace(/-/g, ''),
          dob: dob,
          street: values.street,
          city: values.city,
          state: state,
          zip: values.zip,
          verificationImage: images[0].data_url
        }, {
        withCredentials: true,
      })
        .then(function (response) {
          setIsPending(false)

          if (response.status == 200) {
            setHasAccount(true)
          }
        })
        .catch(function (error) {
          setIsPending(false)
          toast.error(error.response.data.error, {
            duration: 20000,
            style: {
              width: 'auto',
              padding: '16px',
              minWidth: '550px',
              fontWeight: 500

            }
          })
        });
    },
  });

  return (
    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className=" w-full  flex gap-[20px] ">
        <div className="w-[50%] relative ">
          <div className="flex">
            <label htmlFor="idNumber" className="block text-[14px]  mb-1">
              Social Security Number
            </label>
          </div>
          <MaskedInput
            id="idNumber"
            name="idNumber"
            type={isVisible ? 'text' : 'password'}
            maxLength="11"
            mask="111-11-1111"
            placeholder=''
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idNumber}
            className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
          />
          <div className="absolute top-9 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
            {
              isVisible ? (

                <Eye className="w-5 h-5 opacity-60" />
              ) : (
                <EyeOff className="w-5 h-5 opacity-60" />
              )
            }
          </div>
          {formik.touched.idNumber && formik.errors.idNumber ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.idNumber}</div> : null}

        </div>
        <div className="w-[50%] relative max-h-[42px] z-[99] ">
          <div className="flex">
            <label htmlFor="dob" className="block text-[14px]   mb-1">
              Date of Birth
            </label>
          </div>
          <DobComponent value={dob} onChange={date => setdob(date)} />
          {formik.touched.dob && formik.errors.dob ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.dob}</div> : null}
        </div>
      </div>

      <div className="  w-full relative">
        <div className="flex">
          <label htmlFor="street" className="block text-[14px]   mb-1">
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
          className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
        />
        {formik.touched.street && formik.errors.street ? <div className="absolute top-[70px] text-red-600 text-[12px]  font-bold">{formik.errors.street}</div> : null}
      </div>

      <div className="  w-full relative">
        <div className="flex">
          <label htmlFor="city" className="block text-[14px]   mb-1">
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
          className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
        />
        {formik.touched.city && formik.errors.city ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.city}</div> : null}
      </div>

      <div className=" w-full  flex gap-[20px]">
        <div className="w-[70%] relative">
          <div className="flex">
            <label htmlFor="state" className="block text-[14px]   mb-1">
              State
            </label>
          </div>
          <div >
            <SelectUSState
              className={`dropdown w-full border focus:border-black p-2 rounded-lg outline-none `}
              name="state"
              value={state}
              onChange={state => setState(state)} />
          </div>
          {formik.touched.state && formik.errors.state ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.state}</div> : null}
        </div>
        <div className="w-[30%] relative">
          <div className="flex">
            <label htmlFor="zip" className="block text-[14px]   mb-1">
              ZIP code
            </label>
          </div>
          <input
            id="zip"
            name="zip"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zip}
            className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
          />
          {formik.touched.zip && formik.errors.zip ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.zip}</div> : null}
        </div>
      </div>
      {/* stripe image verification */}
      <div className=" w-full relative flex flex-col">
        <p className="text-[14px]">Identity Document</p>
        <div className=" h-[160px]  mt-1">
          <ImageLoader
            images={images}
            setImages={(image) => setImages(image)}
          />
        </div>
        <p className="mt-1 text-[13px] text-slate-600">Upload a photo of the front side of your identification document</p>
        {formik.errors.images ? <div className="absolute top-[210px] text-red-600 text-[12px] font-bold">{formik.errors.images}</div> : null}
      </div>
      <Button disabled={isPending} type="submit" className='w-full mt-8 text-[16px] flex gap-2'>
        {
          isPending ? (
            <>
              <Loader2 size={18} className='animate-spin' />
              Validating...
            </>
          ) : (
            <>
              <Lock size={18} />
              Next
            </>
          )
        }
      </Button>
    </form>

  );
}
