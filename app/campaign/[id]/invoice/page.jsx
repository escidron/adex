"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useContext } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { UserContext } from '@/app/layout';
import adexLogo from '../../../../public/adex-logo-black-yellow.png';

export default function CampaignInvoicePage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [campaign, setCampaign] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const invoiceRef = useRef(null);
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [autoSendStatus, setAutoSendStatus] = useState('');
  const [hasResent, setHasResent] = useState(false);

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

  // Auto-send email once when redirected from campaign creation
  useEffect(() => {
    const shouldSendEmail = searchParams.get('sendEmail');
    
    if (shouldSendEmail === 'true' && campaign && !isAutoSending && !autoSendStatus) {
      console.log('🚀 Auto-sending email once...');
      setIsAutoSending(true);
      
      setTimeout(async () => {
        await sendInvoiceEmail();
      }, 1000);
    }
  }, [campaign]);

  // Common PDF generation function for consistent results
  const generateInvoicePDF = async () => {
    if (!invoiceRef.current) {
      throw new Error('Invoice reference not found');
    }

    console.log('📄 Starting PDF generation...');
    
    // Wait for images to load completely
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
              // Add timeout for broken images
              setTimeout(resolve, 5000);
            }
          })
      )
    );

    // Extended delay for complete rendering (fonts, CSS, layout)
    console.log('⏳ Waiting for complete rendering...');
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const canvas = await html2canvas(invoiceRef.current, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      imageTimeout: 20000,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedImages = clonedDoc.querySelectorAll('img');
        clonedImages.forEach(img => {
          img.style.display = 'block';
          img.style.visibility = 'visible';
        });
      }
    });
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    
    console.log('✅ PDF generation completed');
    return pdf;
  };

  const sendInvoiceEmail = async () => {
    if (!campaign) {
      console.log('❌ No campaign data');
      setAutoSendStatus('❌ Missing campaign data');
      return;
    }

    try {
      setAutoSendStatus('🔄 Generating PDF...');
      
      const pdf = await generateInvoicePDF();
      const pdfBase64 = pdf.output('datauristring').split(',')[1];
      console.log('✅ PDF generated for email, size:', pdfBase64.length, 'chars');
      
      setAutoSendStatus('📧 Preparing invoice email...');
      
      const totalBudget = Number(campaign.max_participants) * Number(campaign.reward_amount);
      const serviceFee = totalBudget * 0.1;
      const finalTotal = totalBudget + serviceFee;
      
      const emailData = {
        campaign_id: params.id,
        recipient_email: companyData?.[0]?.email || 'nohdennis@gmail.com',
        recipient_name: companyData?.[0]?.company_name || 'Test Company',
        invoice_data: {
          campaign_name: campaign.name,
          company_name: companyData?.[0]?.company_name || 'Test Company',
          company_email: companyData?.[0]?.email || 'nohdennis@gmail.com',
          company_address: companyData?.[0]?.address || 'Home-based business',
          company_phone: companyData?.[0]?.phone || 'N/A',
          invoice_date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          total_budget: finalTotal, // Numeric value for API validation
          campaign_details: {
            max_participants: Number(campaign.max_participants),
            reward_amount: Number(campaign.reward_amount),
            campaign_budget: totalBudget.toLocaleString(),
            service_fee: serviceFee.toLocaleString(),
            total_budget_formatted: finalTotal.toLocaleString()
          },
          banking_info: {
            bank_name: 'Truist Bank',
            bank_address: '7681 Linton Hall Rd, Gainesville, VA 20155',
            routing_number: '051404260',
            account_number: '1470002991527'
          }
        },
        pdf_attachment: {
          filename: `campaign_invoice_${params.id}.pdf`,
          content: pdfBase64,
          contentType: 'application/pdf'
        }
      };

      setAutoSendStatus('📧 Sending email...');
      console.log('📧 Sending email to:', companyData?.[0]?.email || 'nohdennis@gmail.com');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns/send-invoice-email`,
        emailData,
        { withCredentials: true }
      );
      
      console.log('📨 Email API response:', response.data);
      
      if (response.data.success || response.status === 200) {
        setAutoSendStatus('✅ Email sent successfully!');
        console.log('✅ Invoice email sent successfully!');
        
        // Save PDF to company after successful email send (non-blocking)
        try {
          await savePDFToCompany(pdfBase64, `campaign_invoice_${params.id}.pdf`);
          setAutoSendStatus('✅ Email sent and invoice saved to company profile!');
        } catch (saveError) {
          console.error('❌ PDF save error (non-critical):', saveError);
          setAutoSendStatus('✅ Email sent! (Invoice save pending - backend API needed)');
        }
      } else {
        throw new Error(response.data.message || 'Email sending failed');
      }
      
    } catch (error) {
      console.error('❌ Email sending error:', error);
      setAutoSendStatus('❌ Email sending failed');
    } finally {
      setIsAutoSending(false);
    }
  };

  const savePDFToCompany = async (pdfBase64, filename) => {
    try {
      if (!companyData || companyData.length === 0) {
        console.log('❌ No company data available');
        return;
      }

      const saveData = {
        company_id: companyData[0].id,
        campaign_id: params.id,
        campaign_name: campaign.name,
        pdf_base64: pdfBase64,
        filename: filename
      };

      console.log('💾 Saving PDF to company...');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/companies/save-invoice-pdf`,
        saveData,
        { withCredentials: true }
      );

      if (response.data.success || response.status === 200) {
        console.log('✅ PDF saved to company successfully!');
      } else {
        console.log('❌ PDF save failed:', response.data.message);
      }
    } catch (error) {
      console.error('❌ PDF save error:', error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      console.log('🔽 Starting download PDF generation...');
      const pdf = await generateInvoicePDF();
      pdf.save(`campaign_invoice_${params.id}.pdf`);
      console.log('✅ PDF download completed');
    } catch (error) {
      console.error('❌ PDF download error:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    }
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
  } : {
    name: 'ADEX Corp.',
    email: 'info@adex.com',
    address: '123 Adex Street, Seoul, Korea',
    phone: '010-1234-5678',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 mt-[90px]">
      {/* Email Status and Resend */}
      <div className="max-w-[800px] w-full mb-6">
        {autoSendStatus && autoSendStatus.includes('✅') && (
          <div className="p-4 rounded-lg text-center bg-green-100 text-green-800">
            <div className="text-lg font-semibold mb-2">{autoSendStatus}</div>
            <div className="text-sm">
              {!hasResent ? (
                <>
                  Haven't received the email?{' '}
                  <button 
                    onClick={() => {
                      setHasResent(true);
                      sendInvoiceEmail();
                    }}
                    className="text-blue-600 underline hover:text-blue-800 font-medium"
                  >
                    Click here to resend
                  </button>
                </>
              ) : (
                <span className="text-gray-600">Email has been resent. Please check your inbox.</span>
              )}
            </div>
          </div>
        )}
      </div>
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
            </div>
          </div>
        </div>

        {/* Campaign Details Section */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Campaign Details</h3>
          <div className="w-16 h-1 bg-gray-400 rounded"></div>
        </div>

        <div className="space-y-0 mb-4">
          <div className="bg-yellow-300 py-2 px-2 rounded border-l-4 border-yellow-400">
            <strong className="text-xl font-bold">Campaign Name:</strong> <span className="text-xl font-bold">{campaign.name}</span>
          </div>
          <div className="bg-gray-200 py-2 px-2 rounded">
            <strong className="text-lg">Participants Limit:</strong> <span className="text-lg">{campaign.max_participants}</span>
          </div>
          <div className="bg-gray-100 py-2 px-2 rounded">
            <strong className="text-lg">Reward Amount:</strong> <span className="text-lg">${Number(campaign.reward_amount).toLocaleString()}</span>
          </div>
          <div className="bg-gray-200 py-2 px-2 rounded">
            <strong className="text-lg">Campaign Budget:</strong> <span className="text-lg">${(Number(campaign.max_participants) * Number(campaign.reward_amount)).toLocaleString()}</span>
          </div>
          <div className="bg-gray-100 py-2 px-2 rounded">
            <strong className="text-lg">ADEX Service Fee (10%):</strong> <span className="text-lg">${((Number(campaign.max_participants) * Number(campaign.reward_amount)) * 0.1).toLocaleString()}</span>
          </div>
          <div className="bg-gray-300 py-2 px-2 rounded text-lg">
            <strong>Total Budget:</strong> <span>${((Number(campaign.max_participants) * Number(campaign.reward_amount)) * 1.1).toLocaleString()}</span>
          </div>
        </div>

        {/* ARH Information Section */}
        <div className="mb-4">
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">ARH Information</h3>
            <div className="w-16 h-1 bg-gray-400 rounded"></div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="space-y-3 text-base">
              <div className="flex items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600 w-24">Bank Name:</span>
                <span className="font-semibold text-gray-800 ml-4">Truist Bank</span>
              </div>
              <div className="flex items-start py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600 w-24">Address:</span>
                <span className="font-semibold text-gray-800 ml-4">7681 Linton Hall Rd, Gainesville, VA 20155</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600 w-24">Routing #:</span>
                <span className="font-semibold text-gray-800 ml-4">051404260</span>
              </div>
              <div className="flex items-center py-2">
                <span className="font-medium text-gray-600 w-24">Account #:</span>
                <span className="font-semibold text-gray-800 ml-4">1470002991527</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section - Terms and Questions */}
        <div className="flex justify-between items-start pt-2 border-t">
          {/* Terms and Conditions */}
          <div className="flex-1 mr-8">
            <h3 className="font-bold text-lg mb-3">Terms and Conditions:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                <span>Payment is due upon receipt of this invoice</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                <span>Late payments may cause campaign start date delays</span>
              </div>
            </div>
          </div>

          {/* Questions/Contact Section */}
          <div className="text-right">
            <h4 className="font-bold text-lg mb-3">Questions</h4>
            <div className="space-y-2 text-sm">
              <div>Email: info@adexconnect.com</div>
              <div>Call: (555) 703-2339</div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm italic mt-2">
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