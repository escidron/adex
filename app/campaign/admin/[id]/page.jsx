"use client"
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"
import { CheckCircle, Clock } from 'lucide-react'
import { UserContext } from '@/app/layout'
import { useRouter } from 'next/navigation'

export default function CampaignAdminPage({params}) {
    const router = useRouter()
    const [user] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [participants, setParticipants] = useState([])
    const [campaign, setCampaign] = useState(null)
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(() => {
        fetchCampaignAndParticipants()
    }, [])

    const fetchCampaignAndParticipants = async () => {
        try {
            // First, fetch campaign details to check ownership
            const campaignResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}`,
                { withCredentials: true }
            )
            const campaignData = campaignResponse.data.data
            setCampaign(campaignData)
            
            // Check if current user owns this campaign
            const isOwner = checkCampaignOwnership(campaignData)
            
            if (!isOwner) {
                toast.error('Access denied. You can only manage your own campaigns.')
                router.push('/my-profile?tab=5&sub-tab=1') // Redirect to My Campaigns
                return
            }
            
            setHasAccess(true)
            
            // If user has access, fetch participants
            const participantsResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}/participants`,
                { withCredentials: true }
            )
            
            const activeParticipants = participantsResponse.data.data.filter(p => p.deleted_at === null)
            const uniqueParticipants = Array.from(new Set(activeParticipants.map(p => p.id)))
                .map(id => activeParticipants.find(p => p.id === id))
            
            setParticipants(uniqueParticipants || [])
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching campaign data:', error)
            toast.error(error.response?.data?.error || 'Failed to load campaign data')
            router.push('/my-profile?tab=5&sub-tab=1')
            setIsLoading(false)
        }
    }

    const checkCampaignOwnership = (campaign) => {
        if (!user.userId || !campaign) return false
        
        // Check various possible owner field names
        const ownerFields = ['creator_id', 'user_id', 'owner_id', 'created_by']
        for (const field of ownerFields) {
            if (campaign[field] && campaign[field] === user.userId) {
                return true
            }
        }
        
        return false
    }

    const handleCheckClick = async (submissionId) => {
        console.log('Check click - Submission ID:', submissionId)
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/submissions/${submissionId}/check`,
                { 
                    is_checked: true,
                    note: "SNS post verified"
                },
                { withCredentials: true }
            )
            console.log('Check response:', response.data)
            toast.success('Successfully checked submission')
            await fetchParticipants()
        } catch (error) {
            console.error('Error updating check status:', error)
            toast.error(error.response?.data?.error || 'Failed to check submission')
        }
    }

    const handleRewardClick = async (submissionId) => {
        console.log('Reward click - Submission ID:', submissionId)
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/submissions/${submissionId}/reward`,
                { 
                    is_rewarded: true,
                    note: "Reward processed"
                },
                { withCredentials: true }
            )
            console.log('Full reward response:', response)
            console.log('Reward response data:', response.data)

            // API call was successful
            toast.success('Reward sent successfully')
            await fetchParticipants()
        } catch (error) {
            console.error('Error updating reward status:', error)
            console.error('Error response:', error.response?.data)
            
            // Use the error message from the response if available
            const errorMessage = error.response?.data?.error || 'Failed to send reward'
            toast.error(errorMessage)
        }
    }

    const handleRemoveClick = async (submissionId) => {
        console.log('Remove click - Submission ID:', submissionId)
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}/submissions/${submissionId}`,
                { withCredentials: true }
            )
            console.log('Remove response:', response.data)
            
            toast.success('Participant removed successfully')
            
            setParticipants(prevParticipants => 
                prevParticipants.filter(p => p.id !== submissionId)
            )
        } catch (error) {
            console.error('Error removing participant:', error)
            
            const errorMessage = error.response?.data?.message || 'Failed to remove participant'
            toast.error(errorMessage)
        }
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FCD33B]"></div>
            </div>
        )
    }

    // If user doesn't have access, don't render the page
    if (!hasAccess) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-4">Access Denied</h1>
                    <p className="text-gray-500">Redirecting to your campaigns...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div><Toaster /></div>
            <div className="w-full mt-[80px] py-4 flex flex-col items-center">
                <div className="w-full max-w-[1100px] px-6">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
                        Campaign Participants
                    </h1>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">User Name</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">SNS URL</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Submitted At</th>
                                    <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">Verify Status</th>
                                    <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">Reward Status</th>
                                    <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participants.length > 0 ? (
                                    participants.map((participant) => {
                                        console.log('Rendering participant row:', {
                                            submission_id: participant.id,
                                            campaign_id: participant.campaign_id,
                                            is_checked: participant.is_checked,
                                            is_rewarded: participant.is_rewarded
                                        })
                                        return (
                                            <tr key={`submission-${participant.id}`} className="border-b hover:bg-gray-50">
                                                <td className="py-4 px-6">
                                                    <span className="font-medium">{participant.user_name}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {participant.sns_url ? (
                                                        <a 
                                                            href={participant.sns_url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {participant.sns_url}
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400 italic">Not submitted yet</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-gray-500">
                                                    {new Date(participant.submitted_at).toLocaleString()}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            participant.is_checked
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {participant.is_checked ? (
                                                                <span className="flex items-center gap-1">
                                                                    <CheckCircle size={12} />
                                                                    Verified
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock size={12} />
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                                            participant.is_rewarded
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {participant.is_rewarded ? (
                                                                <span className="flex items-center gap-1">
                                                                    <CheckCircle size={12} />
                                                                    Rewarded
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock size={12} />
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleCheckClick(participant.id)}
                                                            disabled={participant.is_checked === 1 || !participant.sns_url}
                                                            className={`px-4 py-2 rounded ${
                                                                participant.is_checked === 1 || !participant.sns_url
                                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                            }`}
                                                            title={!participant.sns_url ? 'SNS URL not submitted yet' : ''}
                                                        >
                                                            Verify
                                                        </button>
                                                        <button
                                                            onClick={() => handleRewardClick(participant.id)}
                                                            disabled={participant.is_checked === 0 || participant.is_rewarded === 1}
                                                            className={`px-4 py-2 rounded ${
                                                                participant.is_checked === 0 || participant.is_rewarded === 1
                                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                            }`}
                                                        >
                                                            Reward
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveClick(participant.id)}
                                                            className="px-4 py-2 rounded text-xs bg-red-500 hover:bg-red-600 text-white"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">
                                            No participants found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
} 