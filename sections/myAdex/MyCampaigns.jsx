'use client'

import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Megaphone, Users, Calendar, DollarSign, Eye, Edit, Trash2, Trophy, CheckCircle, Clock, XCircle, AlertCircle, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

export default function MyCampaigns({ label, data = [], status = {}, isContentLoaded, setCampaignData, selectedCompanyId, userType }) {
  const router = useRouter()
  const [user] = useContext(UserContext)
  const [createdCampaigns, setCreatedCampaigns] = useState([])
  const [participatedCampaigns, setParticipatedCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [showSnsModal, setShowSnsModal] = useState(false)
  const [selectedParticipation, setSelectedParticipation] = useState(null)
  const [snsUrl, setSnsUrl] = useState('')
  const [isSubmittingSns, setIsSubmittingSns] = useState(false)

  useEffect(() => {
    fetchAllCampaigns()
  }, [selectedCompanyId])

  const fetchAllCampaigns = async () => {
    try {
      // Fetch user's created campaigns
      const createdResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/my-campaigns`,
        { withCredentials: true }
      )

      let filteredCampaigns = createdResponse.data.data || []

      // For business users (userType === 1), filter campaigns by selected company
      if (userType === 1 && selectedCompanyId) {
        filteredCampaigns = filteredCampaigns.filter(campaign => {
          // Check various possible company field names
          return campaign.company_id === selectedCompanyId ||
                 campaign.creator_company_id === selectedCompanyId ||
                 campaign.company === selectedCompanyId
        })
      }

      setCreatedCampaigns(filteredCampaigns)

      // Fetch campaigns user participated in
      const participatedResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/participated`,
        { withCredentials: true }
      )
      setParticipatedCampaigns(participatedResponse.data.data || [])

      if (setCampaignData) {
        setCampaignData(filteredCampaigns)
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error.response?.data || error.message)
      toast.error('Failed to load campaigns')
      setCreatedCampaigns([])
      setParticipatedCampaigns([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (campaignId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${campaignId}`,
        { withCredentials: true }
      )
      toast.success('Campaign deleted successfully')
      fetchAllCampaigns()
    } catch (error) {
      toast.error('Failed to delete campaign')
    }
  }

  const handleView = (campaignId) => {
    router.push(`/campaign/${campaignId}`)
  }

  const handleValidate = (campaignId) => {
    router.push(`/campaign/admin/${campaignId}`)
  }

  // Check if current user owns the campaign
  const isOwner = (campaign) => {
    // Since /api/campaigns/my-campaigns already returns only user's campaigns,
    // we can assume all campaigns in createdCampaigns are owned by current user
    // But we can add additional validation if campaign has creator_id or user_id field
    if (!user.userId) return false
    
    // Check various possible owner field names
    const ownerFields = ['creator_id', 'user_id', 'owner_id', 'created_by']
    for (const field of ownerFields) {
      if (campaign[field] && campaign[field] === user.userId) {
        return true
      }
    }
    
    // If no explicit owner field found, and this is from my-campaigns endpoint,
    // we can assume it's owned by current user
    return true
  }

  const handleSubmitSns = (participation) => {
    setSelectedParticipation(participation)
    setSnsUrl(participation.sns_url || '')
    setShowSnsModal(true)
  }

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  const isValidSnsUrl = (url) => {
    if (!isValidUrl(url)) return false;
    
    const snsPatterns = [
      /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\//,
      /^https?:\/\/(www\.)?twitter\.com\//,
      /^https?:\/\/(www\.)?x\.com\//,
      /^https?:\/\/(www\.)?facebook\.com\//,
      /^https?:\/\/(www\.)?fb\.com\//,
      /^https?:\/\/(www\.)?tiktok\.com\//,
      /^https?:\/\/(www\.)?youtube\.com\//,
      /^https?:\/\/(www\.)?youtu\.be\//,
      /^https?:\/\/(www\.)?linkedin\.com\//,
      /^https?:\/\/(www\.)?snapchat\.com\//
    ];
    
    return snsPatterns.some(pattern => pattern.test(url));
  }

  const submitSnsUrl = async () => {
    if (!snsUrl.trim()) {
      toast.error('Please enter your SNS post URL')
      return
    }

    if (!isValidSnsUrl(snsUrl.trim())) {
      toast.error('Please enter a valid social media URL (Instagram, Twitter/X, Facebook, TikTok, YouTube, LinkedIn, Snapchat)')
      return
    }

    setIsSubmittingSns(true)
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/submissions/${selectedParticipation.participation_id}/update-url`,
        { sns_url: snsUrl.trim() },
        { withCredentials: true }
      )
      toast.success('SNS URL submitted successfully!')
      setShowSnsModal(false)
      fetchAllCampaigns() // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit SNS URL')
    } finally {
      setIsSubmittingSns(false)
    }
  }

  const getParticipationStatus = (status) => {
    switch(status) {
      case 'rewarded':
        return { icon: Trophy, color: 'text-green-500', label: 'Rewarded' }
      case 'approved':
        return { icon: CheckCircle, color: 'text-green-500', label: 'Approved' }
      case 'pending':
        return { icon: Clock, color: 'text-yellow-500', label: 'Pending' }
      case 'rejected':
        return { icon: XCircle, color: 'text-red-500', label: 'Rejected' }
      default:
        return { icon: Clock, color: 'text-gray-500', label: 'Unknown' }
    }
  }

  if (isLoading && !isContentLoaded) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FCD33B]"></div>
      </div>
    )
  }

  const renderCreatedCampaigns = () => {
    if (createdCampaigns.length === 0) {
      return (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Megaphone size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Campaigns Created</h3>
            <p className="text-gray-500 mb-4">You haven't created any campaigns yet</p>
            <Button
              onClick={() => router.push('/listing/create/1')}
              className="bg-[#FCD33B] hover:bg-[#FCD33B]/90 text-black"
            >
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      )
    }

    // Sort campaigns by active status first, then by date
    const sortedCampaigns = [...createdCampaigns].sort((a, b) => {
      const isActiveA = new Date(a.end_date) >= new Date()
      const isActiveB = new Date(b.end_date) >= new Date()
      
      if (isActiveA && !isActiveB) return -1
      if (!isActiveA && isActiveB) return 1
      return new Date(b.start_date) - new Date(a.start_date)
    })

    return (
      <div className="space-y-3">
        {sortedCampaigns.map((campaign) => {
          const isActive = new Date(campaign.end_date) >= new Date()
          const participationRate = campaign.max_participants > 0
            ? Math.round((campaign.participant_count / campaign.max_participants) * 100)
            : 0

          // Determine status based on campaign.status first, then date
          const getStatusDisplay = () => {
            if (campaign.status === 'pending') {
              return { text: 'Pending', style: 'bg-yellow-500 text-white' }
            } else if (campaign.status === 'planned') {
              return { text: 'Planned', style: 'bg-orange-500 text-white' }
            } else if (campaign.status === 'active') {
              return { text: 'Active', style: 'bg-green-500 text-white' }
            } else if (campaign.status === 'rejected') {
              return { text: 'Rejected', style: 'bg-red-500 text-white' }
            } else if (campaign.status === 'closed') {
              return { text: 'Ended', style: 'bg-gray-500 text-white' }
            } else {
              return { text: isActive ? 'Active' : 'Ended', style: isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white' }
            }
          }

          const statusDisplay = getStatusDisplay()

          return (
            <Card key={campaign.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusDisplay.style}`}>
                      {statusDisplay.text}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{campaign.participant_count}/{campaign.max_participants} participants</span>
                      <div className="bg-gray-200 rounded-full h-2 w-16 ml-2">
                        <div 
                          className="bg-[#FCD33B] h-2 rounded-full"
                          style={{ width: `${participationRate}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      <span className="font-semibold">${Number(campaign.reward_amount).toFixed(2)}</span>
                      <span>per participant</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>
                        {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {/* Only show Validate button if user owns the campaign */}
                  {isOwner(campaign) && (
                    <Button
                      onClick={() => handleValidate(campaign.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit size={16} className="mr-1" />
                      Validate
                    </Button>
                  )}
                  <Button
                    onClick={() => router.push(`/campaign/${campaign.id}`)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye size={16} className="mr-1" />
                    Detail
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  const renderParticipatedCampaigns = () => {
    if (participatedCampaigns.length === 0) {
      return (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Trophy size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Participations Yet</h3>
            <p className="text-gray-500 mb-4">You haven't participated in any campaigns</p>
            <Button
              onClick={() => router.push('/campaign')}
              className="bg-[#FCD33B] hover:bg-[#FCD33B]/90 text-black"
            >
              Browse Campaigns
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-3">
        {participatedCampaigns.map((participation) => {
          const campaign = participation.campaign || participation

          // Determine overall status based on the participation data
          const getOverallStatus = () => {
            // 4. Rewarded - highest priority
            if (participation.reward_sent === true || participation.status === 'rewarded') {
              return { icon: Trophy, color: 'text-green-600 bg-green-100', label: 'Rewarded' }
            }
            
            // 3. Verified - approved but not rewarded yet  
            if (participation.approved_at || participation.status === 'approved') {
              return { icon: CheckCircle, color: 'text-blue-600 bg-blue-100', label: 'Verified' }
            }
            
            // 2. Submitted - has SNS URL but not verified yet
            if (participation.sns_url && participation.sns_url.trim() !== '') {
              return { icon: Send, color: 'text-orange-600 bg-orange-100', label: 'Submitted' }
            }
            
            // 1. Not Submitted - registered but no SNS URL
            return { icon: Clock, color: 'text-gray-600 bg-gray-100', label: 'Not Submitted' }
          }

          const overallStatus = getOverallStatus()
          const OverallStatusIcon = overallStatus.icon

          return (
            <Card key={campaign.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    
                    {/* Single Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${overallStatus.color}`}>
                      <OverallStatusIcon size={14} />
                      {overallStatus.label}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      <span className="font-semibold">${Number(campaign.reward_amount).toFixed(2)}</span>
                      <span>reward</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>
                        Submitted: {participation.submitted_at ? new Date(participation.submitted_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    {participation.sns_url && (
                      <div className="flex items-center gap-1">
                        <span>Submission: </span>
                        <a 
                          href={participation.sns_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline truncate max-w-xs"
                          title={participation.sns_url}
                        >
                          {participation.sns_url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleView(campaign.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye size={16} className="mr-1" />
                    View Campaign
                  </Button>
                  <Button
                    onClick={() => handleSubmitSns(participation)}
                    variant="outline"
                    size="sm"
                    className={participation.sns_url ? "bg-green-50" : "bg-yellow-50"}
                  >
                    <Send size={16} className="mr-1" />
                    {participation.sns_url ? 'Edit Link' : 'Submit Link'}
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Campaigns</h2>
      </div>

      <Box sx={{ width: '100%' }}>
        {userType === 1 ? (
          // Business users see both tabs
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab 
                  label={
                    <div className="flex items-center gap-2">
                      <Megaphone size={16} />
                      <span>Created Campaigns ({createdCampaigns.length})</span>
                    </div>
                  }
                />
                <Tab 
                  label={
                    <div className="flex items-center gap-2">
                      <Trophy size={16} />
                      <span>Participated Campaigns ({participatedCampaigns.length})</span>
                    </div>
                  }
                />
              </Tabs>
            </Box>
            
            <Box sx={{ pt: 2 }}>
              {activeTab === 0 && renderCreatedCampaigns()}
              {activeTab === 1 && renderParticipatedCampaigns()}
            </Box>
          </>
        ) : (
          // Regular users see only participated campaigns
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <h3 className="text-lg font-medium text-gray-900 pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Trophy size={16} />
                  <span>Participated Campaigns ({participatedCampaigns.length})</span>
                </div>
              </h3>
            </Box>
            
            <Box>
              {renderParticipatedCampaigns()}
            </Box>
          </>
        )}
      </Box>

      {showDeleteModal && (
        <DeleteConfirmationModal
          label="campaign"
          setShowDeleteModal={setShowDeleteModal}
          deleteElement={async () => {
            await handleDelete(selectedCampaignId)
            setShowDeleteModal(false)
          }}
        />
      )}

      {/* SNS URL Submission Modal */}
      {showSnsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Submit SNS Post Link</h3>
            <p className="text-gray-600 mb-4">
              Provide your social media post URL here. Supported platforms: Instagram, Twitter/X, Facebook, TikTok, YouTube, LinkedIn, Snapchat.
            </p>
            <input
              type="url"
              value={snsUrl}
              onChange={(e) => setSnsUrl(e.target.value)}
              placeholder="https://instagram.com/p/example or https://twitter.com/user/status/123"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={submitSnsUrl}
                disabled={isSubmittingSns}
                className="flex-1 bg-[#FCD33B] hover:bg-[#FCD33B]/90 text-black"
              >
                {isSubmittingSns ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                onClick={() => {
                  setShowSnsModal(false)
                  setSnsUrl('')
                }}
                variant="outline"
                className="flex-1"
                disabled={isSubmittingSns}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}