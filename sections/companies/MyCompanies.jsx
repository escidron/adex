"use client"
import { useState, useEffect } from 'react';
import AddCompanyModal from '@/sections/companies/AddCompanyModal'
import CompanyCard from '@/components/infoCard/CompanyCard';
import RemoveCompany from '@/actions/RemoveCompany';
import toast from 'react-hot-toast';
import GetCompanies from '@/actions/GetCompanies';
import { Button } from '@/components/ui/button';


export default function MyCompanies() {
    const [companies, setCompanies] = useState([]);
    const [addCompany, setAddCompany] = useState(false);
    const [editCompany, setEditCompany] = useState(null);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        async function GetData() {
            const companies = await GetCompanies()
            setCompanies(companies)
        }
        GetData();
    }, [refetch]);

    const removeCompany = async (id) => {
        const message = await RemoveCompany(id)
        if (message) {
            toast.success(message)
            setRefetch(prev => !prev)
        } else {
            toast.error('Something went wrong')
        }
    }

    if (companies.length === 0) {
        return (
            <>

                {
                    addCompany ? (
                        <AddCompanyModal setAddCompany={(show) => setAddCompany(show)} setRefetch={(refresh) => setRefetch(refresh)} />
                    ) : (
                        <div className={`flex justify-center items-center mt-8  `}>
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

    return (
        <div className={`w-full flex flex-col items-center  min-h-screen py-2`}>

            {
                addCompany ? (
                    <AddCompanyModal
                        setAddCompany={(show) => setAddCompany(show)}
                        setRefetch={(refresh) => setRefetch(refresh)}
                        editCompany={editCompany}
                    />
                ) : (

                    <div className="flex flex-col items-center rounded-lg p-6 w-full lg:w-1/2 max-w-[600px] min-w-[400px] ">
                        <h1 className="text-[30px]">My Companies</h1>
                        <div className={`flex justify-start w-full `}>
                            <Button onClick={() => {
                                setEditCompany(null)
                                setAddCompany(true)
                                }}>Register Company</Button>
                        </div>
                        <div className='mt-4 w-full'>

                            {
                                companies.map((company) => (
                                    <div key={company.id}>
                                        <CompanyCard
                                            company={company}
                                            removeCompany={() => removeCompany(company.id)}
                                            handleEdit={(companyId) => {
                                                setEditCompany(company)
                                                setAddCompany(true)
                                            }}
                                        />
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
