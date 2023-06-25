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

const inter = Inter({ subsets: ['latin'] })


export default function PlaceForm({ typeId, isPeriodic, setSelectedStep }) {
  const currentDate = new Date();
  let currentDateDay = currentDate.getDate();
  let currentDateMonth = currentDate.getMonth() > 0 ? currentDate.getMonth() - 1 : currentDate.getMonth();
  let currentDateYear = currentDate.getFullYear()
  const [isPending, setIsPending] = useState(false)

  const [durationType, setdurationType] = useState('1');
  const [subType, setSubType] = useState('1');
  const [counter, setCounter] = useState(1);
  const [date, setDate] = useState(dayjs(`${currentDateYear}-${currentDate.getMonth()}-${currentDateDay + 1}`));
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState('');
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
  const handleSubType = (e) => {
    const id = e.currentTarget.id
    if (id !== durationType) {
      //formik.values.durationType = id
      setSubType(id);
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
    }

    if (!values.description) {
      errors.description = 'Required';
    }

    if (currentDateDay >= date.$D || currentDateMonth > date.$M || currentDateYear > date.$y) {
      errors.date = 'Must be higher';
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
      date: date,
      image: images,
      price: '',
    },
    validate,
    onSubmit: async values => {

      setIsPending(true)

      await axios.post('http://localhost:8000/api/advertisements/new',
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
          ad_duration_type: isPeriodic ? durationType : 0,
          start_date: date,
          duration: counter,
          sub_asset_type: typeId === 9 ? subType : 0,
          units: 0,
          per_unit_price: 0
        }, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(function (response) {

          console.log('response', response)
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
  console.log(response)
  return (
    <>
      {!response ? (

        <form className='grid grid-cols-2 gap-x-10 gap-y-4' onSubmit={formik.handleSubmit}>
          <div className=" mt-2 w-full ">
            <div className='flex'>
              <label htmlFor="title" className="block   mb-1 ">
                Ad Title
              </label>
              {formik.touched.title && formik.errors.title ? <div className="ml-2 text-red-600 font-bold">{formik.errors.title}</div> : null}
            </div>
            <input
              type="text"
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="w-full border  p-3 rounded-lg outline-none"
            />
          </div>

          <div className=" mt-2 w-full">
            <div className='flex'>
              <label htmlFor="location" className="block   mb-1">
                Location
              </label>
              {formik.touched.location && formik.errors.location ? <div className="ml-2 text-red-600 font-bold">{formik.errors.location}</div> : null}
            </div >
            <MapCoordinatesContext.Provider value={[coords, setCoords]}>
              <div className="w-full border rounded-lg outline-none min-h-[50px] flex items-center">
                <PlacesAutocomplete setSelected={setSelected} setAddress={(ad) => setAddress(ad)} />
              </div>
            </MapCoordinatesContext.Provider>
          </div>
          {typeId === 9 ? (
            <div className=" mt-2 w-full flex gap-4">
              <div className={`w-full`}>
                <label htmlFor="emal" className="block   mb-1">
                  Sub-asset type
                </label>
                <div className="flex gap-2">
                  <div
                    type="text"
                    id="1"
                    name="account-1"
                    value={formik.values.subType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleSubType(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${subType == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Window
                  </div>
                  <div
                    type="text"
                    id="2"
                    name="account-2"
                    value={formik.values.subType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleSubType(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${subType == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Door
                  </div>
                  <div
                    type="text"
                    id="3"
                    name="account-3"
                    value={formik.values.subType}
                    onClick={(e) => handleSubType(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 rounded-lg outline-none ${subType == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Interior wall
                  </div>
                  <div
                    type="text"
                    id="4"
                    name="account-4"
                    value={formik.values.subType}
                    onClick={(e) => handleSubType(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px]  p-2 rounded-lg outline-none ${subType == '4' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >Exterior wall
                  </div>
                </div>
                {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
              </div>

            </div>
          ) : null}

          {isPeriodic === 1 ? (
            <div className=" mt-2 w-full flex gap-4">
              <div className={`w-[80%]`}>
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
              <div className={`w-[20%]`}>
                <label htmlFor="emal" className="block   mb-1">
                  Duration
                </label>
                <CounterComponent counter={counter} setCounter={(c) => setCounter(c)} />
                {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
              </div>
            </div>
          ) : null}

          <div className=" mt-2 w-full flex gap-4 relative">
            <div className={`w-[40%]`}>
              <label htmlFor="price" className="block   mb-1">
                Price
              </label>
              <div className='relative flex-col '>
                <p className='absolute top-[11px] left-2 text-[18px] font-[400] '>$</p>
                <input
                  id='price'
                  onInput={(e) => formatNumberInput(e)}
                  placeholder='0'
                  type="text"
                  className='max-h-[50px] py-4 px-5 rounded-md w-full border outline-none flex items-center text-[18px]'
                  // value={price}
                  // onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : 0)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
              </div>
              {formik.touched.price && formik.errors.price ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.price}</div> : null}
            </div>
            <div className={`w-[60%]`}>
              <label htmlFor="date" className="block   mb-1">
                Start Date
              </label>
              <DatePickerComponent
                id='date'
                setDate={(date) => setDate(date)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? <div className="absolute  top-[80px] right-0 text-red-600 font-bold">{formik.errors.date}</div> : null}
            </div>
          </div>

          <div className="col-start-1 mt-2 w-full relative">
            <label htmlFor="description" className="block   mb-1 ">
              Description
            </label>
            <textarea
              type="textarea"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`w-full border  p-3 rounded-lg outline-none h-[160px] resize-none ${inter.className}`}
            />
            {formik.touched.description && formik.errors.description ? <div className="absolute top-[190px] text-red-600 font-bold">{formik.errors.description}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <label htmlFor="image" className="block  mb-1 ">
              Image
            </label>
            <div className={`w-full border rounded-lg outline-none h-[160px] resize-none ${inter.className}`}>
              <ImageLoader images={images} setImages={(image) => setImages(image)} />
            </div>
            {formik.touched.image && formik.errors.image ? <div className="absolute  top-[190px] text-red-600 font-bold">{formik.errors.image}</div> : null}
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
          </div>

        </form>
      ) : (
        <div className='mt-200px min-w-[500px] flex mx-auto justify-center'>
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
        </div>
      )}
    </>
  )
}

