"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { UserContext } from "@/app/layout";
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner'
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import BlackButton from "@/components/buttons/BlackButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import TextField from "@/components/inputs/TextField";
import TermsOfUseModal from "@/components/modals/TermsOfUseModal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

export default function SignUppage() {
  const [user, setUser] = useContext(UserContext)
  const [accountType, setAccountType] = useState('');
  const [showTerms, setShowterms] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [allowReverseListingNotification, setAllowReverseListingNotification] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const router = useRouter();

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

    if (!values.accountType) {
      errors.accountType = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must have more than 8 characters.';
    }

    if (!values.password2) {
      errors.password2 = 'Required';

    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords must be equal'
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
      accountType: '',
      checkTerms: checkTerms
    },
    validate,
    onSubmit: values => {
      setIsPending(true)
      toast.dismiss()
      if (checkTerms && checkPrivacy) {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/users`,
          {
            name: `${values.firstName} ${values.lastName}`,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            password: values.password,
            accountType: accountType,
            allowReverseListingNotification: allowReverseListingNotification
          }, {
          withCredentials: true,
        })
          .then(function (response) {
            if (response.status === 200) {
              setUser({
                ...user,
                isLogged: false,
                name: values.firstName,
                showLoginOptions: false,
                userId: response.data.userId,
                userType: response.data.userType,
                hasPayout: false,
                notifications: 0,
                notificationQuantity: [],
                image: ""

              })
              setTimeout(() => {
                router.push('/account-confirmation')
                setIsPending(false)
              }, 1000);
            } else if (response.status === 401) {
              setTimeout(() => {
                setIsPending(false)
              }, 1000);
            }

          })
          .catch(function (error) {
            setIsPending(false)
            toast.error(error.response.data.error, {
              duration: 10000,
              style: {
                width: 'auto',
                padding: '16px',
                minWidth: '450px',
                fontWeight: 500

              }
            })
          });
      } else {
        setIsPending(false)
        toast.error('Accept the Terms of Service and Privacy Policy before continue.', {
          duration: 10000,
          style: {
            width: 'auto',
            padding: '16px',
            minWidth: '450px',
            fontWeight: 500

          }
        })
      }
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
    <div className={`bg-black style_login flex flex-col h-screen w-full items-center px-2 justify-center py-4 overflow-y-scroll fixed z-[99] top-0 left-0 `}>
      <div><Toaster />
      </div>
      <div className=' fixed top-0 left-0 w-full h-full bg-black z-[90] opacity-70'></div>
      <div onClick={() => {
        toast.dismiss()
        router.push('/')
      }} className="z-[91] absolute top-[20px] cursor-pointer">
        <Image
          src='/adex-logo-white-yellow.png'
          alt="Adex Logo"
          width={70}
          height={70}
          priority
        />
      </div>
      <form className=" z-[91] flex flex-col  justify-center items-center text-black font-[400] w-[100%] absolute top-[60px] pt-2 pb-[100px]  mt-[30px]" onSubmit={formik.handleSubmit}>
        <div className="w-full px-8 sm:w-[400px] sm:px-0 max-w-[500px]">

          <p className="text-white text-[36px]">Register</p>
          <p className="text-white text-[16px]  sm:text-[18px] font-normal mb-6 mt-2">Register to access the <span className="text-[#FCD33B]">ADEX</span> Market Place</p>

          <div className=" w-full relative">
            <TextField
              id="firstName"
              label='First Name'
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              erros={formik.errors.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? <div className="absolute top-[50px]  text-red-600 font-bold">{formik.errors.firstName}</div> : null}
          </div>

          <div className=" mt-8 w-full relative">
            <TextField
              type="text"
              label='Last Name'
              id="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              erros={formik.errors.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? <div className="absolute top-[50px] text-red-600  font-bold">{formik.errors.lastName}</div> : null}
          </div>

          <div className=" mt-8 w-full relative">
            <TextField
              type="text"
              label='Email'
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              erros={formik.errors.email}
            />
            {formik.touched.email && formik.errors.email ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.email}</div> : null}
          </div>

          <div className=" mt-8 w-full relative">
            <TextField
              type="text"
              label='Phone Number'
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              erros={formik.errors.phone}
            />
            {formik.touched.phone && formik.errors.phone ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.phone}</div> : null}
          </div>

          <div className=" mt-8 w-full relative">
            <TextField
              type="password"
              label='Password'
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              erros={formik.errors.password}
            />
            {formik.touched.password && formik.errors.password ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.password}</div> : null}
          </div>

          <div className=" mt-8 w-full relative">
            <TextField
              type="password"
              label='Confirm Password'
              id="password2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2}
              erros={formik.errors.password2}
            />
            {formik.touched.password2 && formik.errors.password2 ? <div className="absolute top-[50px] text-red-600 font-bold">{formik.errors.password2}</div> : null}
          </div>

          <div className=" mt-4 w-full relative">
            <div className="flex">
              <label htmlFor="account" className="block text-white  mb-1">
                Account Type
              </label>
              {formik.touched.accountType && formik.errors.accountType ? <div className="ml-4 text-red-600 font-bold">{formik.errors.accountType}</div> : null}

            </div>
            <div className="flex gap-2">
              <Dialog className='w-full' open={open} onOpenChange={setOpen}>
                <DialogTrigger className={`w-[48%] flex justify-center items-center p-2 rounded-lg outline-none cursor-pointer  hover:text-black hover:bg-[#FCD33B] 
              ${accountType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'} 
              `}>
                  <div
                    type="text"
                    id="1"
                    name="account-1"
                    value={formik.values.accountType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleAccountType(e)}
                    className="w-full"
                  >Business
                  </div>
                </DialogTrigger>
                <DialogContent className='w-full max-w-[650px]  overflow-y-auto z-[99]'>
                  <div className='mt-8 grid gap-4 grid-cols-1 w-full'>
                    <p>Would you like to be notified if a buyer requests an asset type that you possess in your location? (Standard business for campaign would be a Store, Walls, Property) (these need to be very simple assets than any business location would all possess)</p>
                  </div>
                  <DialogFooter>
                    <SecondaryButton label='No' dark={true} onClick={
                      () => {
                        setAllowReverseListingNotification(false)
                        setOpen(false)
                      }
                    } />
                    <BlackButton label='Yes' onClick={
                      () => {
                        setAllowReverseListingNotification(true)
                        setOpen(false)
                      }

                    } />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog className='w-full' open={open2} onOpenChange={setOpen2}>
                <DialogTrigger className={`w-[48%] flex justify-center items-center p-2 rounded-lg outline-none cursor-pointer  hover:text-black hover:bg-[#FCD33B] 
              ${accountType == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'} 
              `}>
                  <div
                    type="text"
                    id="2"
                    name="account-2"
                    value={formik.values.accountType}
                    onClick={(e) => handleAccountType(e)}
                    className={`w-full`}
                  >Individual
                  </div>
                </DialogTrigger>
                <DialogContent className='w-full max-w-[650px]  overflow-y-auto z-[99]'>
                  <div className='mt-8 grid gap-4 grid-cols-1 w-full'>
                    <p>Would you like to be notified if there is a buyer who would like to buy an ad in the area of personal asset (car, attire) within the zip code you list?</p>
                  </div>
                  <DialogFooter>
                    <SecondaryButton label='No' dark={true} onClick={
                      () => {
                        setAllowReverseListingNotification(false)
                        setOpen2(false)
                      }
                    } />
                    <BlackButton label='Yes' onClick={
                      () => {
                        setAllowReverseListingNotification(true)
                        setOpen2(false)
                      }

                    } />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className={`flex rounded-lg items-center gap-4 mt-2`}>
            <input className="cursor-pointer" type="checkbox" onChange={() => setCheckTerms(!checkTerms)} checked={checkTerms ? true : false} />
            <p className="text-white text-[14px] sm:text-[16px]">I have read and agree to the <label onClick={() => setShowterms(true)} className={`font-[600] cursor-pointer border-b-[1px] border-white  ${formik.errors.checkTerms && !checkTerms ? ' border-red-600' : ''}`}>Terms of service</label> </p>
          </div>
          <div className={`flex rounded-lg items-center gap-4 mt-2`}>
            <input className="cursor-pointer" type="checkbox" onChange={() => setCheckPrivacy(!checkPrivacy)} checked={checkPrivacy ? true : false} />
            <p className="text-white text-[14px] sm:text-[16px]">I have read and agree to the <label onClick={() => setShowPrivacy(true)} className={`font-[600] cursor-pointer border-b-[1px] border-white  ${formik.errors.checkTerms && !checkTerms ? ' border-red-600' : ''}`}>Privacy Policy</label> </p>
          </div>
          {
            showTerms && (
              <>
                <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-80 flex justify-center items-center'>
                </div>
                <div className='card-payment-modal bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl w-full md:w-[80%] lg:min-w-[800px] h-[80vh]'>
                  <div className=' w-full h-[90%] flex flex-col justify-center items-center overflow-y-scroll'>
                    <TermsOfUseModal />
                  </div>
                  <div className="w-full h-[10%] flex justify-around items-center">
                    <div onClick={() => setShowterms(false)}>
                      <SecondaryButton label='Cancel' dark={true} />
                    </div>
                    <div onClick={() => {
                      setCheckTerms(true)
                      setShowterms(false)
                    }}>
                      <BlackButton label='I agree' />
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {
            showPrivacy && (
              <>
                <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-80 flex justify-center items-center'>
                </div>
                <div className='card-payment-modal bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl w-full md:w-[80%] lg:min-w-[800px] h-[80vh]'>
                  <div className=' w-full h-[90%] flex flex-col justify-center items-center overflow-y-scroll'>
                    <PrivacyPolicyModal />
                  </div>
                  <div className="w-full h-[10%] flex justify-around items-center">
                    <div onClick={() => setShowPrivacy(false)}>
                      <SecondaryButton label='Cancel' dark={true} />
                    </div>
                    <div onClick={() => {
                      setCheckPrivacy(true)
                      setShowPrivacy(false)
                    }}>
                      <BlackButton label='I agree' />
                    </div>
                  </div>
                </div>
              </>
            )
          }
          <Button variant='secondary' disabled={isPending} type='submit' className='w-full mt-4 text-lg font-[600]'>
            {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
            Sign Up
          </Button>
          <Link href={'/login'} disabled={isPending} className='w-full mt-4 text-lg font-[600] inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-[#FCD33B] text-[#FCD33B]  bg-transparent hover:bg-[#FCD33B] hover:text-accent-foreground'>
            {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
            Login
          </Link>
        </div>

      </form>
    </div>
  );
}