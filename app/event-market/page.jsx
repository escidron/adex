"use client"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { Button } from '@/components/ui/button'
import { UserContext } from '@/app/layout'

export default function EventMarketPage() {
    const router = useRouter()
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        fetchCampaigns()
    }, [])

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns`,
                { withCredentials: true }
            )
            setCampaigns(response.data.data)
            setIsLoading(false)
        } catch (error) {
            toast.error('Failed to load campaigns')
            setIsLoading(false)
        }
    }

    const handleEnterClick = (campaignId) => {
        router.push(`/event-market/${campaignId}`)
    }

    const handleValidateClick = (campaignId) => {
        router.push(`/event-market/admin/${campaignId}`)
    }

    const handleAddClick = () => {
        router.push('/event-market/create')
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FCD33B]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div><Toaster /></div>
            <div className="w-full mt-[80px] py-4 flex flex-col items-center">
                <div className="w-full max-w-[1100px] px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            Discover and participate in exclusive ADEX events
                        </h1>
                        <Button
                            onClick={handleAddClick}
                            variant="secondary"
                            className="bg-[#FCD33B] hover:bg-[#FCD33B]/90 text-black"
                        >
                            + Add New Campaign
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="bg-white rounded-lg shadow-image overflow-hidden">
                                <div className="relative h-48">
                                    <Image
                                        src={campaign.image || "/placeholder.jpg"}
                                        alt={campaign.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 line-clamp-1">{campaign.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#FCD33B] font-semibold">
                                            {campaign.participant_count}/{campaign.max_participants} joined
                                        </span>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleEnterClick(campaign.id)}
                                                variant="secondary"
                                                className="bg-black text-white hover:bg-black/90"
                                            >
                                                enter
                                            </Button>
                                            <Button
                                                onClick={() => handleValidateClick(campaign.id)}
                                                variant="outline"
                                                className="border-[#FCD33B] text-black hover:bg-[#FCD33B]/10"
                                            >
                                                validate
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
