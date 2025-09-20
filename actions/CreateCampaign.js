export default async function CreateCampaign(listingProperties, selectedCompany) {

  try {
      const campaignData = {
        name: listingProperties.title, // Map title to name
        description: listingProperties.campaign_description || listingProperties.description,
        max_participants: parseInt(listingProperties.max_participants),
        start_date: listingProperties.start_date,
        end_date: listingProperties.end_date,
        reward_amount: parseInt(listingProperties.reward_amount),
        budget: parseInt(listingProperties.max_participants) * parseInt(listingProperties.reward_amount),
        company_id: selectedCompany || listingProperties.select_business,
        // Add images if present
        ...(listingProperties.images && listingProperties.images.length > 0 && {
          images: listingProperties.images.map(img => ({
            file: true,
            data_url: typeof img === 'string' ? img : img.data_url || img
          }))
        })
      };
      
      console.log('Sending campaign data to API:', campaignData);
      
      // Use the same API endpoint as the existing campaign creation
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/campaigns`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify(campaignData),
        }
      );
  
      console.log('CreateCampaign API Response Status:', response.status);
      const res = await response.json();
      console.log('CreateCampaign API Response:', res);
      
      if (response.status === 200) {
        return res;
      } else {
        console.error('CreateCampaign API Error:', res);
        return null;
      }
    } catch (error) {
      console.error('CreateCampaign Error:', error);
      return null;
    }
  }