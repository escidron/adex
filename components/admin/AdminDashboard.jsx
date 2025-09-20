"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Users,
  DollarSign,
  Megaphone
} from 'lucide-react';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab') || '1';
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch campaigns from API
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/admin/campaigns`,
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        setCampaigns(response.data.data);
      } else if (response.data && Array.isArray(response.data)) {
        setCampaigns(response.data);
      } else {
        setCampaigns([]);
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      toast.error('Failed to load campaigns');
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPendingCampaigns = () => {
    return campaigns.filter(campaign => campaign.status === 'pending');
  };

  const getActiveCampaigns = () => {
    const currentDate = new Date();
    return campaigns.filter(campaign => {
      const endDate = new Date(campaign.end_date);
      return campaign.status === 'active' && endDate >= currentDate;
    });
  };

  const getClosedCampaigns = () => {
    const currentDate = new Date();
    return campaigns.filter(campaign => {
      const endDate = new Date(campaign.end_date);
      return endDate < currentDate;
    });
  };

  const handleViewCampaign = (campaignId) => {
    router.push(`/campaign/${campaignId}`);
  };

  const handleStatusChange = async (campaignId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/admin/campaigns/${campaignId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      toast.success(`Campaign status updated to ${newStatus}`);
      fetchCampaigns(); // Refresh the list
    } catch (error) {
      console.error('Failed to update campaign status:', error);
      toast.error('Failed to update campaign status');
    }
  };

  const renderCampaignCard = (campaign) => {
    const participationRate = campaign.max_participants > 0
      ? Math.round((campaign.participant_count / campaign.max_participants) * 100)
      : 0;

    const getStatusColor = (status) => {
      switch(status) {
        case 'pending': return 'bg-yellow-500 text-white';
        case 'active': return 'bg-green-500 text-white';
        default: return 'bg-gray-500 text-white';
      }
    };

    return (
      <Card key={campaign.id} className="p-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">{campaign.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
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

            <div className="text-sm text-gray-500">
              Created by: <span className="font-medium">{campaign.creator_name}</span>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            {campaign.status === 'pending' && (
              <>
                <Button
                  onClick={() => handleStatusChange(campaign.id, 'active')}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleStatusChange(campaign.id, 'rejected')}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Reject
                </Button>
              </>
            )}
            <Button
              onClick={() => handleViewCampaign(campaign.id)}
              variant="outline"
              size="sm"
            >
              <Eye size={16} className="mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  const renderCampaignList = (campaignList, emptyMessage) => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FCD33B]"></div>
        </div>
      );
    }

    if (campaignList.length === 0) {
      return (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Megaphone size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Campaigns Found</h3>
            <p className="text-gray-500 mb-4">{emptyMessage}</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-3 mt-4">
        {campaignList.map(campaign => renderCampaignCard(campaign))}
      </div>
    );
  };

  return (
    <>
      <Toaster />
      <div className="w-full bg-white py-4 px-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all campaigns</p>
      </div>

      <div className='w-full flex justify-center bg-[#D9D9D9] h-[40px]'>
        <Link
          href='admin-dashboard?tab=1'
          className={`border-l-[1px] border-r-[1px] ${tab == 1 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] lg:px-[40px] text-[15px] font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}
        >
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <p className='hidden text-[13px] md:flex lg:text-[15px]'>Pending Campaigns</p>
          </div>
        </Link>

        <Link
          href='admin-dashboard?tab=2'
          className={`border-l-[1px] border-r-[1px] ${tab == 2 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] lg:px-[40px] text-[15px] font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={20} />
            <p className='hidden md:flex'>Active Campaigns</p>
          </div>
        </Link>

        <Link
          href='admin-dashboard?tab=3'
          className={`border-l-[1px] border-r-[1px] ${tab == 3 ? 'bg-[#FCD33B]' : 'bg-white'} px-[20px] lg:px-[40px] text-[15px] font-[600] flex items-center justify-center hover:bg-[#FCD33B]`}
        >
          <div className="flex items-center gap-2">
            <XCircle size={20} />
            <p className='hidden md:flex'>Past Campaigns</p>
          </div>
        </Link>
      </div>

      <div className="px-6 py-4">
        {tab == '1' && renderCampaignList(
          getPendingCampaigns(),
          "No pending campaigns awaiting approval"
        )}
        {tab == '2' && renderCampaignList(
          getActiveCampaigns(),
          "No active campaigns currently running"
        )}
        {tab == '3' && renderCampaignList(
          getClosedCampaigns(),
          "No past campaigns found"
        )}
      </div>
    </>
  );
}