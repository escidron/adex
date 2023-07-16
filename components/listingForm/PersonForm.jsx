'use client'
import { useState } from 'react'
import { useFormik } from 'formik';
import Link from 'next/link';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import { Inter } from 'next/font/google'
import CounterComponent from '../counter/CounterComponent';
import ImageLoader from '../ImageLoader/ImageLoader';
import BlackButton from '../buttons/BlackButton';
import SecondaryButton from '../buttons/SecondaryButton';
import dayjs, { Dayjs } from 'dayjs';
import PlacesAutocomplete from '../placesAutocomplete/PlacesAutocomplete';
import { MapCoordinatesContext } from '@/app/market-place/page';
import axios from 'axios';
import base64ToBlob from '@/utils/base64ToBlob';
import Success from '../messages/Success';
import formatNumberInput from '@/utils/formatInputNumbers';
import { ThreeDots } from 'react-loader-spinner'
import TextField from '../inputs/TextField';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


const inter = Inter({ subsets: ['latin'] })
const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FCD33B',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'black',
  },
}));

export default function PersonForm({ typeId, isPeriodic, setSelectedStep, hasPayout }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [isPending, setIsPending] = useState(false)
  const [durationType, setdurationType] = useState('1');
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState(false);
  const [checked, setChecked] = useState(true);

  const [coords, setCoords] = useState({
    lat: -3.745,
    lng: -38.523
  });
  const handleDurationType = (e) => {
    const id = e.currentTarget.id
    if (id !== durationType) {
      formik.values.durationType = id
      setdurationType(id);
    }
  }
  const validate = values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (selected === null) {
      errors.location = 'Required';
    }
    if (values.price === 0 || !values.price) {
      errors.price = 'Must be higher than 0';
    } else if (isNaN(values.price.replace(',',""))) {
      errors.price = 'Must be a number'
    }

    if (!values.description) {
      errors.description = 'Required';
    }

    if (images.length === 0) {
      errors.image = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      location: '',
      description: '',
      image: images,
      price: '',
    },
    validate,
    onSubmit: values => {
      setIsPending(true)

      console.log('images[0].data_url',images[0].data_url)
      axios.post('http://localhost:8000/api/advertisements/new',
        {
          title: values.title,
          description: values.description,
          price: values.price,
          category_id: typeId,
          created_by: '',
          image: images[0].data_url,
          address: address,
          lat: selected.lat,
          long: selected.lng,
          ad_duration_type: isPeriodic ? durationType : '0',
          sub_asset_type: typeId === 9 ? subType : '0',
          units: 0,
          per_unit_price: 0,
          is_automatic:checked?'1':'0'

        }, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
        }
      })
        .then(function (response) {

          setResponse(response.data.message)
          setSelectedStep(4)
          setIsPending(false)
        })
        .catch(function (error) {

          console.log(error)
          setIsPending(false)

        });
    },
  });
  return (
    <>
      {!response ? (

        <form className='grid grid-cols-2 gap-x-8 gap-y-4' onSubmit={formik.handleSubmit}>
          <div className=" w-full relative flex gap-2">
            <div className='w-[70%]'>
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
            <div className={`w-[30%] relative`}>
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

          <div className="w-full relative">
            <MapCoordinatesContext.Provider value={[coords, setCoords]}>
              <div className="w-full border rounded-lg outline-none min-h-[55px] flex items-center">
                <PlacesAutocomplete setSelected={setSelected} setAddress={(ad) => setAddress(ad)} />
              </div>
            </MapCoordinatesContext.Provider>
            {formik.touched.location && formik.errors.location ? <div className="absolute top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.location}</div> : null}

          </div>

          {isPeriodic === 1 ? (
            <div className=" mt-2 w-full flex gap-4">
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
                    className={`w-[48%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${durationType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Monthly
                  </div>
                  <div
                    type="text"
                    id="2"
                    name="account-2"
                    value={formik.values.durationType}
                    onClick={(e) => handleDurationType(e)}
                    className={`w-[48%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${durationType == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Quarterly
                  </div>
                  <div
                    type="text"
                    id="3"
                    name="account-2"
                    value={formik.values.durationType}
                    onClick={(e) => handleDurationType(e)}
                    className={`w-[48%] p-2 min-h-[50px] flex justify-center items-center cursor-pointer rounded-lg outline-none ${durationType == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Annually
                  </div>
                </div>
                {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
              </div>
            </div>
          ) : null}

          <div className="col-start-1 mt-2 w-full relative">
            <textarea
              type="textarea"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              placeholder='Description'
              className={`w-full border  p-3 rounded-lg outline-none h-[160px] resize-none ${inter.className}`}
            />
            {formik.touched.description && formik.errors.description ? <div className="absolute top-[160px] text-red-600 font-bold text-[12px]">{formik.errors.description}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <div className={`w-full border-2 border-dashed  rounded-lg outline-none h-[160px] resize-none ${inter.className}`}>
              <ImageLoader images={images} setImages={(image) => setImages(image)} />
            </div>
            {formik.touched.image && formik.errors.image ? <div className="absolute  top-[160px] text-red-600 font-bold text-[12px]">{formik.errors.image}</div> : null}
          </div>
          <div className=''>
            <div className='flex ite gap-4'>
              <PinkSwitch
                {...label}
                checked={checked}
                onChange={()=>setChecked(!checked)}
                sx={{ marginLeft: '10px' }} />
              <p className='flex items-center'>Accept automatic Booking</p>
            </div>
            <p className='text-[12px] text-gray-500'>You will not have to approve the reservation request</p>
          </div>
          <div className='col-start-2 w-full flex justify-end mt-4'>
            <div className='ml-2'>
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

            </div>
            {/* <div className='ml-1'>
              <SecondaryButton dark={true} label='Save Draft' />
            </div> */}
          </div>

        </form>
      ) : (
        <div className='mt-250px min-w-[500px] flex mx-auto justify-center'>
          {hasPayout ?
            (< Success >
              <h1 className='text-[25px]'>Listing created</h1>

              <p className='my-4'>You will receive your funds in the default bank account registered.</p>

              <div className='flex justify-center w-full'>
                <Link href='/' className='mt-6'>
                  <BlackButton label='Done' />
                </Link>
              </div>
            </Success>
            )
            :

            <Success>
              <h1 className='text-[25px]'>Listing created</h1>

              <p className='my-4'>For receiving your funds,you will need to add a payout method, if you want to do it later,you can find this option in your profile section.</p>

              <div className='flex justify-between w-full'>

                <Link href='/' className='mt-6'>
                  <SecondaryButton label='later' dark={true} />
                </Link>
                <Link href='/add-payout-method' className='mt-6'>
                  <BlackButton label='add now' />
                </Link>
              </div>
            </Success>
          }
        </div >
      )
      }
    </>
  )
}

