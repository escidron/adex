'use client'
import { useState } from 'react'
import { useFormik } from 'formik';
import Link from 'next/link';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import ImageLoader from '../ImageLoader/ImageLoader';
import BlackButton from '../buttons/BlackButton';
import SecondaryButton from '../buttons/SecondaryButton';
import dayjs from 'dayjs';
import PlacesAutocomplete from '../placesAutocomplete/PlacesAutocomplete';
import { MapCoordinatesContext } from '@/app/market-place/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Success from '../messages/Success';
import formatNumberInput from '@/utils/formatInputNumbers';
import { ThreeDots } from 'react-loader-spinner'
import TextField from '../inputs/TextField';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Divider } from '@mui/material';
import { redirect } from 'next/dist/server/api-utils';
import toast from 'react-hot-toast';


const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FCD33B',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'black',
  },
}));

export default function PersonForm({ typeId, isPeriodic, setSelectedStep, hasPayout, advertisement, edit, selectedCompany }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [isPending, setIsPending] = useState(false)
  const [durationType, setdurationType] = useState('1');
  const [images, setImages] = useState(edit ? advertisement.image : []);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [showDiscountsList, setShowDiscountsList] = useState(false);
  const [discountDuration, setDiscountDuration] = useState('');
  const [discount, setDiscount] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [importFromGallery, setImportFromGallery] = useState(false);
  const [date, setDate] = useState(null);

  const router = useRouter();

  const [coords, setCoords] = useState({
    lat: -3.745,
    lng: -38.523
  });
  const handleDurationType = (e) => {
    const id = e.currentTarget.id
    if (id !== durationType) {
      formik.values.durationType = id
      setdurationType(id);
      formik.values.price = ''
    }
  }
  const validate = values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (values.location === null) {
      errors.location = 'Required';
    }

    if (values.price === 0 || !values.price) {
      errors.price = 'Must be higher than 0';
    } else if (typeof (values.price) == 'string') {
      if (isNaN(values.price.replace(',', ""))) {
        errors.price = 'Must be a number'
      }
    }

    if (!values.description) {
      errors.description = 'Required';
    }

    if (images.length === 0) {
      errors.image = 'Required';
    }
    if (isPeriodic !== 1) {

      if (!date) {
        errors.date = 'Required';
      }
    }

    console.log('error', errors)
    return errors;
  };
  console.log('date', date)
  const formik = useFormik({
    initialValues: {
      title: edit ? advertisement.title : "",
      location: edit ? advertisement.address : "",
      description: edit ? advertisement.description : "",
      image: edit ? advertisement.image : images,
      price: edit ? advertisement.price : "",
      date: edit ? advertisement.start_date : date,
    },
    validate,
    onSubmit: values => {
      setIsPending(true)
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/${edit ? 'update' : 'new'}`,
        {
          id: edit ? advertisement.id : '',
          title: values.title,
          description: values.description,
          price: values.price,
          category_id: typeId,
          created_by: edit ? advertisement.created_by : '',
          images: images,
          address: address,
          lat: selected.lat,
          long: selected.lng,
          ad_duration_type: isPeriodic ? durationType : '0',
          sub_asset_type: typeId === 9 ? subType : '0',
          units: 0,
          per_unit_price: 0,
          is_automatic: checked ? '1' : '0',
          discounts: discounts,
          has_payout: hasPayout,
          company_id: selectedCompany,
          importFromGallery: importFromGallery,
          start_date: isPeriodic !== 1 ? date : date ? date : formik.values.date


        }, {
        withCredentials: true,
      })
        .then(function (response) {

          setResponse(response.data.message)
          if (!edit) {
            setSelectedStep(4)
          } else {
            router.push('/my-profile?tab=5')
            toast.success('Listing edited successfully!')
          }
          setIsPending(false)
        })
        .catch(function (error) {

          console.log(error)
          setIsPending(false)

        })

        
    },
  });

  const handleDiscountDuration = (value) => {
    setDiscountDuration(value)
  }
  const handleDiscount = (value) => {
    setDiscount(value)
  }
  const saveDiscount = () => {
    setDiscounts((prev) => ([...prev, { duration: discountDuration, discount: discount }]))
    setDiscountDuration('')
    setDiscount('')
    setShowDiscounts(false)
  }
  const removeDiscount = (id) => {
    const newDiscounts = discounts.filter((item, index) => index != id);
    setDiscounts(newDiscounts)
  }
  return (
    <>
      {!response ? (

        <form className='flex flex-col md:grid md:grid-cols-2 gap-x-8 gap-y-6' onSubmit={formik.handleSubmit}>

          <div className=" w-full relative flex gap-2 mt-auto">
            <TextField
              id='title'
              label='Title'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              errors={formik.errors.title}
            />
            {formik.touched.title && formik.errors.title ? <div className="absolute top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.title}</div> : null}
          </div>
          {
            isPeriodic !== 1 && (
              <div className=" w-full relative flex gap-2">
                <div className='w-[50%] relative'>
                  <label htmlFor="date" className='mb-1'>Event date</label>
                  <DatePickerComponent
                    id='date'
                    setDate={(date) => setDate(date)}
                    currentValue={dayjs(formik.values.date)}
                    maxHeight='55px'
                  />
                  {formik.touched.date && formik.errors.date ? <div className="absolute top-[80px] text-red-600 font-bold text-[12px]">{formik.errors.date}</div> : null}

                </div>
                <div className={`w-[50%] relative mt-auto`}>
                  <TextField
                    id='price'
                    label='Price'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onInput={(e) => formatNumberInput(e.target.value)}
                    value={formik.values.price}
                    errors={formik.errors.price}
                    formatPrice={true}
                  />
                  {formik.touched.price && formik.errors.price ? <div className="absolute  top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.price}</div> : null}
                </div>
              </div>
            )
          }

          {
            isPeriodic === 1 && (
              <>
                <div className="w-full flex gap-4">
                  <div className={`w-full`}>
                    <label htmlFor="emal" className="block   mb-1">
                      Duration Type
                    </label>
                    <div className="flex gap-2">
                      <div
                        type="text"
                        id="1"
                        name="account-1"
                        onClick={(e) => handleDurationType(e)}
                        className={`w-[48%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${durationType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                      >Monthly
                      </div>
                      <div
                        type="text"
                        id="2"
                        name="account-2"
                        value={formik.values.durationType}
                        onClick={(e) => handleDurationType(e)}
                        className={`w-[48%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${durationType == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                      >Quarterly
                      </div>
                      <div
                        type="text"
                        id="3"
                        name="account-2"
                        value={formik.values.durationType}
                        onClick={(e) => handleDurationType(e)}
                        className={`w-[48%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${durationType == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] `}
                      >Annually
                      </div>
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
                  </div>
                </div>
                <div className=" w-full relative flex gap-2 mt-auto items-center">
                  <div className='w-[30%] '>
                    <TextField
                      id='price'
                      label='Price'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onInput={(e) => formatNumberInput(e.target.value)}
                      value={formik.values.price}
                      errors={formik.errors.price}
                      formatPrice={true}
                    />
                    {formik.touched.price && formik.errors.price ? <div className="absolute  top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.price}</div> : null}
                  </div>

                  <div className={`w-[70%] relative flex items-center`}>
                    <div className="  w-full flex gap-4">
                      <div className={`w-full`}>
                        {discounts.length > 0 ? (
                          <div className='flex gap-2 w-full'>
                            <div onClick={() => setShowDiscounts(true)} className='bg-black text-white w-[50px] h-[50px] rounded-lg flex justify-center items-center hover:bg-[#FCD33B] hover:text-black cursor-pointer'>
                              <AddRoundedIcon />
                            </div>
                            <div onClick={() => setShowDiscountsList(!showDiscountsList)} className="relative flex w-full items-center gap-4 justify-center h-[50px] bg-black text-white rounded-lg hover:bg-[#FCD33B] hover:text-black cursor-pointer">
                              <h1>See my discounts</h1>
                              <div className='absolute right-4'>
                                <ArrowDropDownIcon />
                              </div>
                            </div>
                            {
                              showDiscountsList && (
                                <>
                                  <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-80 flex justify-center items-center'>
                                  </div>
                                  <div className='card-payment-modal bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl min-w-[600px] h-[300px] p-4'>
                                    <div className=' w-full flex flex-col items-center'>
                                      <h1 className='text-[25px]'>Listing discounts</h1>
                                      <div className='w-full mt-4 h-[170px] p-2 overflow-y-scroll'>
                                        {discounts.map((discount, index) => (
                                          <div key={index}>
                                            <div className='flex justify-between px-2'>
                                              <div className='flex'>
                                                <h1>Contract duration from<label className='font-semibold'>{` ${discount.duration} ${durationType === '1' ? 'months' : durationType === '2' ? 'quarters' : durationType === '3' ? 'years' : ''} `}</label>have a </h1>
                                                <h1 className='font-semibold ml-1'>{` ${discount.discount}% discount`}</h1>
                                              </div>
                                              <div className='cursor-pointer' onClick={() => removeDiscount(index)}>
                                                <ClearRoundedIcon />
                                              </div>
                                            </div>
                                            <Divider variant="" sx={{ color: 'black', width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="w-full flex justify-around items-center">
                                      <div onClick={() => setShowDiscountsList(false)}>
                                        <SecondaryButton label='Close' dark={true} />
                                      </div>
                                      <div onClick={() => {
                                        setShowDiscountsList(false)
                                        setShowDiscounts(true)
                                      }}>
                                        <BlackButton label='New' />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                          </div>
                        ) : (

                          <div onClick={() => setShowDiscounts(true)} className="flex items-center justify-center h-[50px] bg-black text-white rounded-lg hover:bg-[#FCD33B] hover:text-black cursor-pointer">
                            <h1>Add discounts<label className='text-[11px] ml-1'>(optional)</label></h1>
                          </div>

                        )}
                      </div>
                    </div>
                    {
                      showDiscounts && (
                        <>
                          <div className='bg-black w-full h-[100vh] fixed z-[90] top-0 left-0 opacity-80 flex justify-center items-center'>
                          </div>
                          <div className='card-payment-modal bg-white z-[99] fixed left-[50%] top-[50%] rounded-xl min-w-[400px] h-[280px] p-4'>
                            <div className=' w-full flex flex-col items-center'>
                              <h1 className='text-[25px]'>Create a discount</h1>
                              <div className='w-full flex  gap-3 mt-4'>
                                <TextField
                                  id="duration"
                                  label={`Minimum number of ${durationType === '1' ? 'months' : durationType === '2' ? 'quarters' : durationType === '3' ? 'years' : ''} required`}
                                  name="duration"
                                  value={discountDuration}
                                  onChange={(e) => handleDiscountDuration(e.target.value)}
                                  onBlur={() => { }}
                                />
                              </div>
                              <div className='w-full flex  gap-3 mt-4'>
                                <TextField
                                  id="discount"
                                  label='Discount(%)'
                                  name="discount"
                                  value={discount}
                                  onChange={(e) => handleDiscount(e.target.value)}
                                  onBlur={() => { }}

                                />                        </div>
                            </div>
                            <div className="w-full flex justify-around items-center mt-6">
                              <div onClick={() => setShowDiscounts(false)}>
                                <SecondaryButton label='Cancel' dark={true} />
                              </div>
                              <div onClick={saveDiscount}>
                                <BlackButton label='Save' />
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    }
                  </div>
                </div>
              </>
            )
          }

          <div className="w-full relative">
            <MapCoordinatesContext.Provider value={[coords, setCoords]}>
              <div className="w-full border rounded-lg outline-none min-h-[55px] flex items-center shadow-sm">
                <PlacesAutocomplete
                  setSelected={setSelected}
                  setAddress={(ad) => setAddress(ad)}
                  currentLocation={formik.values.location}
                />
              </div>
            </MapCoordinatesContext.Provider>
            {formik.touched.location && formik.errors.location ? <div className="absolute top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.location}</div> : null}

          </div>

          <div className="col-start-1 mt-2 w-full relative ">
            <textarea
              type="textarea"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder='Description'
              className={`w-full border shadow-sm p-3 rounded-lg outline-none h-[160px] resize-none `}
            />
            {formik.touched.description && formik.errors.description ? <div className="absolute top-[160px] text-red-600 font-bold text-[12px]">{formik.errors.description}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <div className={`w-full border rounded-lg outline-none h-[160px] resize-none `}>
              <ImageLoader
                images={images}
                setImages={(image) => setImages(image)}
                selectedCompany={selectedCompany}
                setImportFromGallery={(isImport) => setImportFromGallery(isImport)}
              />
            </div>
            {formik.touched.image && formik.errors.image ? <div className="absolute  top-[160px] text-red-600 font-bold text-[12px]">{formik.errors.image}</div> : null}
          </div>

          <div className='col-start-2 w-full flex justify-end'>
            <div className='w-full sm:max-w-[220px] sm:ml-2'>
              {
                edit ? (

                  advertisement.status == 1 ? (

                    <button type="submit" className={`flex gap-2 justify-center items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md  ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg`}>
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
                        ) : 'Submit'}
                      </div>
                    </button>
                  ) : ('')
                ) : (
                  <button type="submit" className={`flex gap-2 justify-center items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md  ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg`}>
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
                      ) : 'Submit'}
                    </div>
                  </button>
                )
              }
            </div>
          </div>

        </form>
      ) : !edit && (
        <div className='mt-250px min-w-[500px] flex mx-auto justify-center'>
          {hasPayout ?
            (< Success >

              <h1 className='text-[25px]'> Listing created</h1>

              <p className='my-4'>You will receive your funds in the default bank account registered.</p>

              <div className='flex justify-center w-full'>
                <Link href='/' className='mt-6'>
                  <BlackButton label='Done' />
                </Link>
              </div>

            </Success>
            ) : (
              < Success >
                <h1 className='text-[25px]'>Listing created</h1>

                <p className='my-4'>Great job on creating your listing! To showcase it to potential buyers, please register a payout method. Once set up, your listing will go live and ready for business.</p>

                <div className='flex flex-col justify-around w-full'>
                  <Link href='/add-payout-method' className='mt-6 w-full'>
                    <button className='mt-6 cursor-pointer flex justify-center items-center bg-black py-[8px] w-full px-[30px] rounded-md  font-[600] text-[#FCD33B] hover:text-black hover:bg-[#FCD33B]  text-lg
                                   '>Add Payout Method
                    </button>

                  </Link>
                  <Link href='/' className='mt-2'>
                    <div className='cursor-pointer border-2 flex justify-center items-center border-black text-black  py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-[#FCD33B] hover:text-black text-lg'>
                      Do it later
                    </div>
                  </Link>
                </div>
              </Success>
            )
          }
        </div >
      )
      }
    </>
  )
}
