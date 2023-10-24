"use client"
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import DatePickerComponent from "@/components/datePicker/DatePickerComponent";
import SelectUSState from 'react-select-us-states';
import { ThreeDots } from 'react-loader-spinner'
import toast, { Toaster } from "react-hot-toast";

import ImageLoader from "@/components/ImageLoader/ImageLoader";
import { Eye, EyeOff, Lock } from "lucide-react";
import Footer from "@/components/footer/Footer";
import SelectSearchComponent from "@/components/select-search/SelectSearch";
import { MerchantCategories } from "@/utils/MerchantCategories";



export default function PayoutCompanyForm({ setHasAccount }) {
  // const [user,setUser] = useContext(UserContext)
  const [state, setState] = useState('');
  const [ownerState, setOwnerState] = useState('');
  const [isPending, setIsPending] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [step, setStep] = useState(1);
  const [dob, setDob] = useState('');

  const validate = values => {
    const errors = {};
    if (step == 1) {
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.phone) {
        errors.phone = 'Required';
      }
      if (!values.idNumber) {
        errors.idNumber = 'Required';
      }
      if (!selectedMerchant?.value) {
        errors.mcc = 'Required';
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
    } else if (step == 2) {

      if (!values.ownerIdNumber) {
        errors.ownerIdNumber = 'Required';
      }
      if (!dob) {
        errors.dob = 'Required';
      }
      if (!values.ownerStreet) {
        errors.ownerStreet = 'Required';
      }
      if (!values.jobTitle) {
        errors.jobTitle = 'Required';
      }

      if (!values.ownerCity) {
        errors.ownerCity = 'Required';
      }
      if (!ownerState) {
        errors.ownerState = 'Required';
      }

      if (!values.ownerZip) {
        errors.ownerZip = 'Required';
      }

      if (images.length == 0) {
        errors.images = 'Required';
      }

    }

    console.log('errors', errors)
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      idNumber: '',
      name: '',
      street: '',
      city: '',
      state: state,
      zip: '',
      phone:'',
      jobTitle: '',
      ownerIdNumber: '',
      ownerStreet: '',
      ownerCity: '',
      ownerState: ownerState,
      ownerZip: '',
      image: images
    },
    validate,
    onSubmit: values => {
      toast.dismiss()

      if (step == 2) {
        setIsPending(true)

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/create-company-connect-account`,
          {
            name: values.name,
            idNumber: values.idNumber,
            mcc: selectedMerchant.value,
            street: values.street,
            city: values.city,
            state: state,
            zip: values.zip,
            phone:values.phone,
            jobTitle:values.jobTitle,
            ownerIdNumber: values.ownerIdNumber,
            ownerStreet: values.ownerStreet,
            ownerCity: values.ownerCity,
            ownerState: ownerState,
            ownerZip: values.ownerZip,
            verificationImage: images[0].data_url,
            dob:dob
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
            console.log('addres error', error.response.data.error)
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
      } else {
        setStep(2)
      }
    },
  });


  return (
    <>

      <div className={` flex flex-col items-center justify-center  py-2   p-2 `}>
        <div><Toaster /></div>
        <form className="text-black  z-[91] px-10 py-4 border border-black rounded-lg flex gap-3 flex-col justify-center items-center  max-w-[500px] h-auto " onSubmit={formik.handleSubmit}>
          {
            step == 1 && (
              <>
                <p className=" text-[24px]">Company Details</p>
                {/* <p className=" text-[18px] font-normal mb-6">Register your bill address</p> */}
                <div className=" w-full  flex gap-[20px] ">
                  <div className="w-full relative ">
                    <div className="flex">
                      <label htmlFor="name" className="block text-[14px]  mb-1">
                        Company Name
                      </label>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type='text'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.name}</div> : null}
                  </div>

                </div>

                <div className="w-full flex gap-[20px]">

                  <div className=" w-[50%] min-w-[50%] flex gap-[20px] ">
                    <div className="w-full relative ">
                      <div className="flex">
                        <label htmlFor="idNumber" className="block text-[14px]  mb-1">
                          EIN
                        </label>
                      </div>
                      <input
                        id="idNumber"
                        name="idNumber"
                        type={isVisible ? 'text' : 'password'}
                        maxLength="9"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.idNumber}
                        className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                      />
                      <div className="absolute top-9 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
                        {
                          isVisible ? (

                            // <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                            <Eye className="w-5 h-5 opacity-60" />
                          ) : (
                            // <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                            <EyeOff className="w-5 h-5 opacity-60" />
                          )
                        }
                      </div>
                      {formik.touched.idNumber && formik.errors.idNumber ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.idNumber}</div> : null}
                    </div>

                  </div>

                  <div className="relative w-full h-[42px]">
                    <label htmlFor="idNumber" className="block text-[14px]  mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type='text'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                    />
                    {formik.touched.phone && formik.errors.phone ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.phone}</div> : null}

                  </div>
                </div>

                <div className=" w-full h-[42px]">
                  <label htmlFor="idNumber" className="block text-[14px]  mb-1">
                    Industry
                  </label>
                  <SelectSearchComponent
                    options={MerchantCategories}
                    selectedMerchant={selectedMerchant}
                    setSelectedMerchant={(selected) => setSelectedMerchant(selected)}
                  />
                  {formik.errors.mcc ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.mcc}</div> : null}

                </div>
                <div className=" mt-8 w-full relative">
                  <div className="flex">
                    <label htmlFor="street" className="block text-[14px] mb-1">
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
              </>
            )
          }
          {
            step == 2 && (
              <>
                <p className=" text-[24px]">Owner Details</p>
                <div className=" w-full  flex gap-[20px] ">
                  <div className="w-[50%] relative ">
                    <div className="flex">
                      <label htmlFor="idNumber" className="block text-[14px]  mb-1">
                        Social Security Number
                      </label>
                    </div>
                    <input
                      id="ownerIdNumber"
                      name="ownerIdNumber"
                      type={isVisible ? 'text' : 'password'}
                      maxLength="9"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ownerIdNumber}
                      className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                    />
                    <div className="absolute top-9 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
                      {
                        isVisible ? (

                          // <VisibilityIcon fontSize="small" sx={{ opacity: '0.6' }} />
                          <Eye className="w-5 h-5 opacity-60" />
                        ) : (
                          // <VisibilityOffIcon fontSize="small" sx={{ opacity: '0.6' }} />
                          <EyeOff className="w-5 h-5 opacity-60" />
                        )
                      }
                    </div>
                    {formik.touched.ownerIdNumber && formik.errors.ownerIdNumber ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.ownerIdNumber}</div> : null}

                  </div>
                  <div className="w-[50%] relative max-h-[42px]">
                    <div className="flex">
                      <label htmlFor="dob" className="block text-[14px]   mb-1">
                        Date of Birth
                      </label>
                    </div>
                    <DatePickerComponent
                      id='dob'
                      setDate={(dob) => setDob(dob)}
                      maxHeight='42px'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.dob && formik.errors.dob ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.dob}</div> : null}
                  </div>
                </div>

                <div className="  w-full relative">
                  <div className="flex">
                    <label htmlFor="street" className="block text-[14px]   mb-1">
                      Job Title
                    </label>
                  </div>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jobTitle}
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                  />
                  {formik.touched.jobTitle && formik.errors.jobTitle ? <div className="absolute top-[70px] text-red-600 text-[12px]  font-bold">{formik.errors.jobTitle}</div> : null}
                </div>
                <div className="  w-full relative">
                  <div className="flex">
                    <label htmlFor="street" className="block text-[14px]   mb-1">
                      Street address
                    </label>
                  </div>
                  <input
                    type="text"
                    id="ownerStreet"
                    name="ownerStreet"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ownerStreet}
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                  />
                  {formik.touched.ownerStreet && formik.errors.ownerStreet ? <div className="absolute top-[70px] text-red-600 text-[12px]  font-bold">{formik.errors.ownerStreet}</div> : null}
                </div>

                <div className="  w-full relative">
                  <div className="flex">
                    <label htmlFor="city" className="block text-[14px]   mb-1">
                      City
                    </label>
                  </div>
                  <input
                    type="text"
                    id="ownerCity"
                    name="ownerCity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ownerCity}
                    className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                  />
                  {formik.touched.ownerCity && formik.errors.ownerCity ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.ownerCity}</div> : null}
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
                        name="ownerState"
                        value={ownerState}
                        onChange={ownerState => setOwnerState(ownerState)} />
                    </div>
                    {formik.touched.ownerState && formik.errors.ownerState ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.ownerState}</div> : null}
                  </div>
                  <div className="w-[30%] relative">
                    <div className="flex">
                      <label htmlFor="zip" className="block text-[14px]   mb-1">
                        ZIP code
                      </label>
                    </div>
                    <input
                      id="ownerZip"
                      name="ownerZip"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ownerZip}
                      className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                    />
                    {formik.touched.ownerZip && formik.errors.ownerZip ? <div className="absolute top-[70px] text-red-600 text-[12px] font-bold">{formik.errors.ownerZip}</div> : null}
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
              </>
            )
          }

          {/* stripe image verification */}
          {/* <div className=" w-full relative flex flex-col">
            <p>Identity Document</p>
            <div className=" h-[160px]  mt-1">
              <ImageLoader
                images={images}
                setImages={(image) => setImages(image)}
              />
            </div>
            <p className="mt-1 text-[13px] text-slate-600">Upload a photo of the front side of your identification document</p>
            {formik.errors.images ? <div className="absolute top-[210px] text-red-600 text-[12px] font-bold">{formik.errors.images}</div> : null}
          </div> */}
          <div className=" w-full">
            <button type="submit" className={`flex  gap-2 justify-center min-h-[50px] items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md mt-8  md:mt-4 ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''}  text-lg`}>
              {/* <LockIcon sx={{ fontSize: '18px' }} /> */}
              <Lock size={18} />
              <div className='style_banner_button_text font-semibold text-[18px]'>
                {isPending ? (
                  <ThreeDots
                    height="30"
                    width="40"
                    radius="9"
                    color="#FCD33B"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : 'Next'}
              </div>
            </button>
          </div>
          <p className=" mt-5 text-[14px]">Disclaimer: This information is not being stored by ADEX. It is only used for the Stripe Verification process.</p>
        </form>
      </div>
      <div className="w-full"  >
        <Footer />
      </div>
    </>
  );
}
