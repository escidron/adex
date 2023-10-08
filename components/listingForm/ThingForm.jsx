import { useState } from 'react'
import { useFormik } from 'formik';
import Link from 'next/link';
import DatePickerComponent from '../datePicker/DatePickerComponent';
import { Inter } from 'next/font/google'
import CounterComponent from '../counter/CounterComponent';
import { ThreeDots } from 'react-loader-spinner'
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
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import TextField from '../inputs/TextField';

const inter = Inter({ subsets: ['latin'] })
const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FCD33B',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'black',
  },
}));

export default function PlaceForm({ typeId, isPeriodic, setSelectedStep,hasPayout,advertisement, edit,selectedCompany }) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const currentDate = new Date();
  let currentDateDay = currentDate.getDate();
  let currentDateMonth = currentDate.getMonth() > 0 ? currentDate.getMonth() - 1 : currentDate.getMonth();
  let currentDateYear = currentDate.getFullYear()
  const [isPending, setIsPending] = useState(false)
  const [durationType, setdurationType] = useState('1');
  const [boxes, setBoxes] = useState('1');
  const [boxesQtd, setBoxesQtd] = useState(100);
  const [counter, setCounter] = useState(1);
  const [date, setDate] = useState(dayjs(`${currentDateYear}-${currentDate.getMonth()}-${currentDateDay + 1}`));
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
  const handleBoxes = (e) => {
    const id = e.currentTarget.id
    if (id !== boxes) {
      //formik.values.durationType = id
      setBoxes(id);
      if (id === '2') {
        setBoxesQtd(300);

      } else if (id === '3') {
        setBoxesQtd(500);
      } else if (id === '4') {
        setBoxesQtd(1000);
      } else if (id === '5') {
        setBoxesQtd(1500);
      } else if (id === '6') {
        setBoxesQtd(2000);
      }
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

    if (images.length === 0) {
      errors.image = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title:  edit ? advertisement.title : "",
      location: edit ? advertisement.location : "",
      description: edit ? advertisement.description : "",
      image: edit ? advertisement.image : images,
      price: edit ? advertisement.price : "",
    },
    validate,
    onSubmit: values => {
      setIsPending(true)
      axios.post(`https://test.adexconnect.com/api/advertisements/${edit ? 'update' : 'new'}`,
        {
          title: values.title,
          description: values.description,
          price:  values.price,
          category_id: typeId,
          created_by: '',
          images: images,
          address: address,
          lat: selected.lat,
          long: selected.lng,
          ad_duration_type: isPeriodic ? durationType : 0,
          sub_asset_type: typeId === 9 ? subType : 0,
          units: typeId === 17 ? boxesQtd : 0,
          per_unit_price: typeId === 17 ? values.price : 0,
          is_automatic:checked?'1':'0',
          discounts: discounts,
          company_id:selectedCompany,
          has_payout:hasPayout,


        }, {
        withCredentials: true,
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

        <form className='flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-4' onSubmit={formik.handleSubmit}>
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
                label={typeId === 17?'Price/unit':'Price'}
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
              <div className="w-full border rounded-lg outline-none min-h-[55px] flex items-center shadow-sm">
                <PlacesAutocomplete setSelected={setSelected} setAddress={(ad) => setAddress(ad)} />
              </div>
            </MapCoordinatesContext.Provider>
            {formik.touched.location && formik.errors.location ? <div className="absolute top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.location}</div> : null}
          </div>
          {/* {typeId === 17 ? (
            <div className="col-span-2 mt-2 w-full flex gap-4">
              <div className={`w-full`}>
                <label htmlFor="emal" className="block   mb-1">
                  Quantity
                </label>
                <div className="flex gap-2">
                  <div
                    type="text"
                    id="1"
                    name="account-1"
                    value={formik.values.boxes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleBoxes(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${boxes == '1' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >100 Units
                  </div>
                  <div
                    type="text"
                    id="2"
                    name="account-1"
                    value={formik.values.boxes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleBoxes(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${boxes == '2' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >300 Units
                  </div>
                  <div
                    type="text"
                    id="3"
                    name="account-3"
                    value={formik.values.boxes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleBoxes(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${boxes == '3' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >500 Units
                  </div>
                  <div
                    type="text"
                    id="4"
                    name="account-4"
                    value={formik.values.boxes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={(e) => handleBoxes(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 min-h-[50px] rounded-lg outline-none ${boxes == '4' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >1000 Units
                  </div>
                  <div
                    type="text"
                    id="5"
                    name="account-5"
                    value={formik.values.boxes}

                    onClick={(e) => handleBoxes(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px] p-2 rounded-lg outline-none ${boxes == '5' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >1500 Units
                  </div>
                  <div
                    type="text"
                    id="6"
                    name="account-6"
                    value={formik.values.boxes}

                    onClick={(e) => handleBoxes(e)}
                    className={`w-[48%] flex justify-center items-center cursor-pointer text-[15px]  p-2 rounded-lg outline-none ${boxes == '6' ? 'bg-[#FCD33B] text-black' : 'text-white bg-black'}    hover:text-black hover:bg-[#FCD33B] ${inter.className}`}
                  >2000 Units
                  </div>
                </div>
                {formik.touched.email && formik.errors.email ? <div className="absolute  top-[80px] text-red-600 font-bold">{formik.errors.email}</div> : null}
              </div>

            </div>
          ) : null} */}

          <div className="col-start-1 mt-2 w-full relative">
            <textarea
              type="textarea"
              id="description"
              placeholder='Description'
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`w-full border shadow-sm p-3 rounded-lg outline-none h-[160px] resize-none ${inter.className}`}
            />
            {formik.touched.description && formik.errors.description ? <div className="absolute top-[190px] text-red-600 font-bold">{formik.errors.description}</div> : null}
          </div>

          <div className=" mt-2 w-full relative">
            <div className={`w-full border rounded-lg outline-none h-[160px] resize-none ${inter.className}`}>
              <ImageLoader 
              images={images} 
              setImages={(image) => setImages(image)} 
              selectedCompany={selectedCompany}

              />
            </div>
            {formik.touched.image && formik.errors.image ? <div className="absolute  top-[190px] text-red-600 font-bold">{formik.errors.image}</div> : null}
          </div>
          <div className='col-start-2 w-full flex justify-end mt-4'>
            <div className='w-full sm:max-w-[220px] sm:ml-2'>
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
                    <div  className='cursor-pointer border-2 flex justify-center items-center border-black text-black  py-[8px] w-full px-[30px] rounded-md  font-[600]  hover:bg-[#FCD33B] hover:text-black text-lg'>
                      Do it later
                    </div>
                  </Link>
                </div>
              </Success>
            )
          }
        </div >
      )}
    </>
  )
}

