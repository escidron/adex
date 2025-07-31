"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useContext } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { UserContext } from '@/app/layout';
import adexLogo from '../../../../public/adex-logo-black-yellow.png';

export default function CampaignInvoicePage({ params }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [user, setUser] = useContext(UserContext);
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
        console.error('Error fetching campaign:', error);
      }
    }

    // Fetch company data for the logged-in user
    async function fetchCompanyData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-companies`,
          { withCredentials: true }
        );
        console.log('Company API response:', response.data);
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    }

    fetchCampaign();
    fetchCompanyData();
  }, [params.id]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    
    // Wait for images to load before generating PDF
    const images = invoiceRef.current.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalHeight !== 0) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );

    // Add a delay to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 1000));

    const canvas = await html2canvas(invoiceRef.current, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        const clonedImages = clonedDoc.querySelectorAll('img');
        clonedImages.forEach(img => {
          img.style.display = 'block';
          img.style.visibility = 'visible';
        });
      }
    });
    
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

  // Use company data from API if available, otherwise fallback to hardcoded values
  const companyInfo = companyData && companyData.length > 0 ? {
    name: companyData[0].company_name,
    email: companyData[0].email,
    address: companyData[0].address,
    phone: companyData[0].phone,
    // Only bank and account remain hardcoded
    bank: 'Bank of Example',
    account: '123-456-789',
  } : {
    name: 'ADEX Corp.',
    bank: 'Bank of Example',
    account: '123-456-789',
    email: 'info@adex.com',
    address: '123 Adex Street, Seoul, Korea',
    phone: '010-1234-5678',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 mt-[90px]">
      <div className="max-w-[800px] w-full bg-white rounded-lg shadow-lg p-8" ref={invoiceRef}>
        {/* Header Section - Campaign Invoice Title First */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-4">Campaign Invoice</h1>
        </div>

        {/* Company Info and Logo Section */}
        <div className="flex justify-between items-start mb-8">
          {/* Left Side - Company Logo and Info */}
          <div className="flex flex-col">
            {/* Company Logo */}
            <div className="mb-4">
              {companyData && companyData.length > 0 && companyData[0].company_logo ? (
                <img 
                  src={companyData[0].company_logo}
                  alt="Company Logo"
                  className="h-20 w-auto object-contain"
                  onError={(e) => {
                    console.log('Image load error for:', e.target.src);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', companyData[0].company_logo)}
                />
              ) : null}
              <div className="h-20 w-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center" style={{ display: companyData && companyData.length > 0 && companyData[0].company_logo ? 'none' : 'flex' }}>
                <span className="text-gray-400 text-sm">Company Logo</span>
              </div>
            </div>
            
            <div className="text-sm space-y-1 mb-4">
              <div><strong className="font-bold text-lg">Company:</strong> <span className="font-bold text-lg">{companyInfo.name}</span></div>
              <div><strong className="text-base">Email:</strong> <span className="text-base">{companyInfo.email}</span></div>
              <div><strong className="text-base">Phone:</strong> <span className="text-base">{companyInfo.phone}</span></div>
              <div><strong className="text-base">Address:</strong> <span className="text-base">{companyInfo.address}</span></div>
              <div><strong className="text-base">Bank:</strong> <span className="text-base">{companyInfo.bank}</span></div>
              <div><strong className="text-base">Account #:</strong> <span className="text-base">{companyInfo.account}</span></div>
            </div>
          </div>

          {/* Right Side - ADEX Logo and Invoice Details */}
          <div className="flex flex-col items-end">
            <div className="mb-4">
              <img 
                src="/adex-logo-black-yellow.png"
                alt="ADEX Logo"
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  console.log('ADEX logo load error');
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log('ADEX logo loaded successfully')}
              />
            </div>
            <div className="text-sm text-right">
              <div><strong>Date of Invoice:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div><strong>Invoice Number:</strong> {params.id}-{Math.floor(Math.random() * 1000)}</div>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="bg-white py-2 mb-2">
          <h2 className="text-center font-bold text-black text-xl">Account Details</h2>
        </div>

        <div className="space-y-0 mb-8">
          <div className="bg-yellow-300 p-2 rounded border-l-4 border-yellow-400 flex items-center">
            <strong className="text-lg">Campaign Name:</strong> <span className="text-lg">{campaign.name}</span>
          </div>
          <div className="bg-gray-200 p-2 rounded flex items-center">
            <strong className="text-lg">Participants Limit:</strong> <span className="text-lg">{campaign.max_participants}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded flex items-center">
            <strong className="text-lg">Reward Amount:</strong> <span className="text-lg">${Number(campaign.reward_amount).toLocaleString()}</span>
          </div>
          <div className="bg-gray-200 p-2 rounded flex items-center">
            <strong className="text-lg">Campaign Budget:</strong> <span className="text-lg">${(Number(campaign.max_participants) * Number(campaign.reward_amount)).toLocaleString()}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded flex items-center">
            <strong className="text-lg">ADEX Service Fee (10%):</strong> <span className="text-lg">${((Number(campaign.max_participants) * Number(campaign.reward_amount)) * 0.1).toLocaleString()}</span>
          </div>
          <div className="bg-gray-300 p-2 rounded font-bold text-2xl flex items-center">
            <strong>Total Budget:</strong> <span>${((Number(campaign.max_participants) * Number(campaign.reward_amount)) * 1.1).toLocaleString()}</span>
          </div>
        </div>

        {/* Footer Section - Terms and Questions */}
        <div className="flex justify-between items-start pt-4 border-t">
          {/* Terms and Conditions */}
          <div className="flex-1 mr-8">
            <h3 className="font-bold text-lg mb-3">Terms and Conditions:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Payment is due upon receipt of this invoice</li>
              <li>Late payments may cause campaign start date delays</li>
            </ul>
          </div>

          {/* Questions/Contact Section */}
          <div className="text-right">
            <h4 className="font-bold mb-2">Questions</h4>
            <div className="text-sm">
              <div>Email: info@adexconnect.com</div>
              <div>Call: (555) 703-2339</div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm italic mt-4">
          *Please transfer the total budget to the above account to complete your campaign registration.
        </div>
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