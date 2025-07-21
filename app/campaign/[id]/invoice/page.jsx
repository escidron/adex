"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

export default function CampaignInvoicePage({ params }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    // Fetch campaign details by id
    async function fetchCampaign() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/${params.id}`,
          { withCredentials: true }
        );
        setCampaign(response.data.data);
      } catch (error) {
        // Handle error (could show toast or redirect)
      }
    }
    fetchCampaign();
  }, [params.id]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save(`campaign_invoice_${params.id}.pdf`);
  };

  if (!campaign) {
    return <div className="w-full min-h-screen flex justify-center items-center">Loading invoice...</div>;
  }

  // Example company info (replace with real info as needed)
  const companyInfo = {
    name: 'ADEX Corp.',
    bank: 'Bank of Example',
    account: '123-456-789',
    email: 'info@adex.com',
    address: '123 Adex Street, Seoul, Korea',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4">
      <div className="max-w-[600px] w-full bg-gray-50 rounded-lg shadow-lg p-8" ref={invoiceRef}>
        <h1 className="text-3xl font-bold mb-4 text-center">Campaign Invoice</h1>
        <div className="mb-6">
          <div className="text-lg font-semibold mb-2">Campaign Name:</div>
          <div className="text-xl mb-2">{campaign.name}</div>
          <div className="text-md mb-1">Participants Limit: <b>{campaign.max_participants}</b></div>
          <div className="text-md mb-1">Reward Amount: <b>${Number(campaign.reward_amount).toLocaleString()}</b></div>
          <div className="text-md mb-1">Total Budget: <b>${(Number(campaign.max_participants) * Number(campaign.reward_amount)).toLocaleString()}</b></div>
        </div>
        <div className="mb-6">
          <div className="text-lg font-semibold mb-2">ADEX Company Info</div>
          <div className="text-md mb-1">Company: <b>{companyInfo.name}</b></div>
          <div className="text-md mb-1">Bank: <b>{companyInfo.bank}</b></div>
          <div className="text-md mb-1">Account: <b>{companyInfo.account}</b></div>
          <div className="text-md mb-1">Email: <b>{companyInfo.email}</b></div>
          <div className="text-md mb-1">Address: <b>{companyInfo.address}</b></div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">* Please transfer the total budget to the above account to complete your campaign registration.</div>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-8 px-6 py-3 bg-[#FCD33B] text-black font-semibold rounded-lg shadow hover:bg-[#FCD33B]/90 transition-colors"
      >
        Download Invoice PDF
      </button>
    </div>
  );
} 