"use client"
import { useState } from 'react';
import axios from 'axios';
import TextField from '@/components/inputs/TextField';
import { useFormik } from 'formik';
import PlacesAutocomplete from '@/components/placesAutocomplete/PlacesAutocomplete';
import { MapCoordinatesContext } from '@/app/market-place/page';
import ImageLoader from '@/components/ImageLoader/ImageLoader';
import { Inter } from 'next/font/google'
import { ThreeDots } from 'react-loader-spinner'
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export default function AddCompanyModal({ setAddCompany, setRefetch }) {
    const [selected, setSelected] = useState(null);
    const [address, setAddress] = useState('');
    const [images, setImages] = useState([]);
    const [isPending, setIsPending] = useState(false)

    const [coords, setCoords] = useState({
        lat: -3.745,
        lng: -38.523
    });

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }

        if (selected === null) {
            errors.address = 'Required';
        }

        console.log(errors)
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            image: images,
            address: address
        },
        validate,
        onSubmit: values => {
            setIsPending(true)
            // console.log('values', values)
            // console.log('adres', address)
            // console.log('images', images.length > 0?images[0].data_url:'')
            axios.post('http://localhost:5000/api/users/add-company',
                {
                    name: values.name,
                    image: images.length > 0?images[0].data_url:'',
                    address:address
                }, {
                withCredentials: true,
            })
            .then(function (response) {
                console.log('response add company', response)
                setIsPending(false)
                setRefetch(true)
                toast.success(response.data.message)

            })
            .catch(function (error) {
                console.log('error',error)
                if (error.response.status === 400) {
                    toast.error(error.response.data.message, {
                        duration: 6000,
                        style: {
                            width: 'auto',
                            padding: '16px',
                            minWidth: '450px',
                            fontWeight: 500

                        }
                    })
                } else {
                    toast.error(error.response.data.message, {
                        duration: 6000,
                        style: {
                            padding: '8px',
                            fontWeight: 500

                        }
                    })
                }
            })
            .finally(function (response) {
                setAddCompany(false)
            })
        },
    });
    return (
        <>

            <form onSubmit={formik.handleSubmit} className={`flex justify-center ${inter.className}`}>
                <div className=' px-[30px] py-[15px]  bg-white rounded-xl w-[450px]'>
                    <div className='flex justify-center items-center mb-[20px] w-full'>
                        <h1 className='text-[25px]'>Register your company</h1>
                    </div>
                    <div className='flex justify-between items-center flex-col mb-[20px] '>

                        <div className=" mt-6 w-full  text-black ">
                            <TextField
                                id='name'
                                label='Company Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errors={formik.errors.name}
                            />

                            {formik.touched.name && formik.errors.name ? <div className="absolute  top-[50px] text-red-600 font-bold">{formik.errors.name}</div> : null}
                        </div>
                        <div className="w-full mt-4 relative">
                            <MapCoordinatesContext.Provider value={[coords, setCoords]}>
                                <div className="w-full border rounded-lg outline-none min-h-[55px] flex items-center">
                                    <PlacesAutocomplete setSelected={setSelected} setAddress={(ad) => setAddress(ad)} />
                                </div>
                            </MapCoordinatesContext.Provider>
                            {formik.touched.address && formik.errors.address ? <div className="absolute top-[55px] text-red-600 font-bold text-[12px]">{formik.errors.address}</div> : null}

                        </div>

                        <div className=" mt-4 w-full relative">
                            <div className={`w-full rounded-lg outline-none h-[160px] resize-none ${inter.className}`}>
                                <ImageLoader
                                    images={images}
                                    setImages={(image) => setImages(image)}
                                />
                            </div>
                            {formik.touched.image && formik.errors.image ? <div className="absolute  top-[160px] text-red-600 font-bold text-[12px]">{formik.errors.image}</div> : null}
                        </div>
                        <button type="submit" className={`flex gap-2 mt-4 justify-center items-center w-full bg-black text-[#FCD33B] py-[8px] px-[30px] rounded-md  ${!isPending ? 'hover:bg-[#FCD33B] hover:text-black' : ''} text-lg`}>
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
                                ) : 'Register'}
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};