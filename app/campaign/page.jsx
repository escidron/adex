"use client"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { Button } from '@/components/ui/button'
import { UserContext } from '@/app/layout'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'
export default function EventMarketPage() {
    const router = useRouter()
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [campaigns, setCampaigns] = useState([])
    const [showPast, setShowPast] = useState(false); // Toggle for past campaigns

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCampaignId, setSelectedCampaignId] = useState(null)

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
        if (!user || !user.isLogged) {
            toast.error("Login is required to participate in a campaign.", {
                duration: 3000,
                style: { fontWeight: 500 }
            });
            return;
        }
        router.push(`/campaign/${campaignId}`)
    }

    const handleValidateClick = (campaignId) => {
        router.push(`/campaign/admin/${campaignId}`)
    }

    const handleAddClick = () => {
        router.push('/campaign/create')
    }

    const handleDeleteClick = async (campaignId) => {

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${campaignId}`,
                { withCredentials: true }
            )
            toast.success('Campaign deleted successfully')
            fetchCampaigns() // Refresh the list
        } catch (error) {
            toast.error('Failed to delete campaign')
        }
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FCD33B]"></div>
            </div>
        )
    }

    return (
        <>
          <div className="min-h-screen bg-white">
            <div><Toaster /></div>
            <div className="w-full mt-[80px] py-4 flex flex-col items-center">
              <div className="w-full max-w-[1100px] px-6">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    Discover and participate in exclusive ADEX events
                  </h1>
                </div>
                {/* Filter toggle for past campaigns */}
                <div className="flex items-center mb-6">
                  <input
                    id="showPast"
                    type="checkbox"
                    checked={showPast}
                    onChange={() => setShowPast(!showPast)}
                    className="mr-2"
                  />
                  <label htmlFor="showPast" className="text-gray-700 text-md select-none cursor-pointer">
                    Show Past Campaigns
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns
                    .filter(campaign => {
                      // Only show active campaigns
                      if (campaign.status !== 'active') return false;

                      if (showPast) return true;
                      // Hide campaigns whose end_date is before today
                      const today = new Date();
                      const endDate = new Date(campaign.end_date);
                      return endDate >= new Date(today.toDateString());
                    })
                    .map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-lg shadow-image overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={
                            campaign.image_gallery ?
                              `${process.env.NEXT_PUBLIC_SERVER_IP}/images/${campaign.image_gallery}` :
                              "/no-image.png"
                          }
                          alt={campaign.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.target.src = "/no-image.png";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4 line-clamp-1">{campaign.name}</h3>
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[#FCD33B] font-semibold">
                              {campaign.participant_count}/{campaign.max_participants} joined
                            </span>
                              <span className="text-black font-semibold">
                                Reward: ${Number(campaign.reward_amount).toLocaleString()}
                              </span>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleEnterClick(campaign.id)}
                              variant="secondary"
                              className="bg-black text-white hover:bg-black/90 flex-1"
                            >
                              enter
                            </Button>
                            {/* Only show Validate button if the user is a business user and the creator of the campaign */}
                            {user && user.userType === 1 && campaign.created_by === user.userId && (
                              <Button
                                onClick={() => handleValidateClick(campaign.id)}
                                variant="outline"
                                className="border-[#FCD33B] text-black hover:bg-[#FCD33B]/10 flex-1"
                              >
                                validate
                              </Button>
                            )}
                              {/* Only show Delete button if the user is a business user and the creator of the campaign */}
                              {user && user.userType === 1 && campaign.created_by === user.userId && (
                            <Button
                              onClick={() => {
                                setSelectedCampaignId(campaign.id);
                                setShowDeleteModal(true);
                              }}
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
                            >
                              Delete
                            </Button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {showDeleteModal && (
            <DeleteConfirmationModal
              label="campaign"
              setShowDeleteModal={setShowDeleteModal}
              deleteElement={async () => {
                await handleDeleteClick(selectedCampaignId);
                setShowDeleteModal(false);
              }}
            />
          )}
        </>
      )
}
