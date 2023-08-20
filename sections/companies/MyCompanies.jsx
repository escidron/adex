"use client"
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AddCompanyModal from './AddCompanyModal';
import CompanyCard from '@/components/infoCard/CompanyCard';
const inter = Inter({ subsets: ['latin'] })

export default function MyCompanies() {
    const [companies, setCompanies] = useState([]);
    const [addCompany, setAddCompany] = useState(false);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        async function GetCompanies() {
            const response = await fetch(
                "https://test.adexconnect.com/api/users/get-companies",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.status === 200) {
                const res = await response.json()
                console.log(res)
                console.log('getting companies')

                setCompanies(res)
            }
        }
        GetCompanies();
    }, [refetch]);

    if (companies.length === 0) {
        return (
            <>

                {
                    addCompany ? (
                        <AddCompanyModal setAddCompany={(show) => setAddCompany(show)} refetch={refetch} setRefetch={(refresh) => setRefetch(refresh)} />
                    ) : (
                        <div className={`flex justify-center items-center mt-8 ${inter.className} `}>
                            <div className="bg-white p-8 rounded-lg shadow-md border">
                                <h2 className="text-2xl font-semibold mb-4">My Companies</h2>
                                <p className="text-gray-500">You haven&apos;t registered any companies yet.</p>
                                <button onClick={() => setAddCompany(true)} className='style_banner_button w-full  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                     lg:py-[10px] lg:px-[30px] lg:mt-10 '>
                                    <p className='style_banner_button_text font-medium'>Register company</p>
                                </button>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
    console.log('addCompany', addCompany)
    return (
        <div className={` flex flex-col items-center  min-h-screen py-2 `}>

            {
                addCompany ? (
                    <AddCompanyModal setAddCompany={(show) => setAddCompany(show)} setRefetch={(refresh) => setRefetch(refresh)} />
                ) : (

                    <div className="
                    flex 
                    flex-col
                    items-center
                    rounded-lg 
                    p-6
                    w-1/2
                    max-w-[600px]
                    min-w-[400px]
                ">
                        <h1 className="text-[30px]">My Companies</h1>
                        <div className={`flex justify-start w-full ${inter.className}`}>
                            <div>
                                <button onClick={() => setAddCompany(true)} className='style_banner_button  mx-auto z-10 bg-black py-[10px] px-[20px] rounded-md mt-4  md:mt-5 hover:bg-[#FCD33B] hover:text-black text-lg
                                         lg:py-[10px] lg:px-[30px] lg:mt-10 '>
                                    <p className='style_banner_button_text font-medium'>Register company</p>
                                </button>
                            </div>
                        </div>
                        <div className='mt-4 w-full'>

                            {
                                companies.map((company) => (
                                    <div key={company.id}>
                                        <CompanyCard company={company} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div >
    );
}
