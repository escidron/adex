'use client'


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Check } from "lucide-react"

export default function CompanyList({ companies, handleSelectedCompany, selectedCompany }) {
    return (
        <div>

            {
                companies.map((company) => (
                    <div onClick={()=>handleSelectedCompany(company.id)} key={company.company_name} className={`mt-1 flex justify-between px-4 py-4 border rounded-lg items-center cursor-pointer hover:border-black ${selectedCompany == company.id && 'border-black'}`}>
                        <div className="flex gap-2 items-center text-[18px]">
                            <Avatar>
                                <AvatarImage src={company.company_logo} alt="company logo" />
                                <AvatarFallback className='font-[600]'>{company.company_name.substring(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {company.company_name}
                        </div>
                        {
                            selectedCompany == company.id && (

                                <Check />
                            )
                        }
                    </div>

                ))
            }
        </div>

    )
}
