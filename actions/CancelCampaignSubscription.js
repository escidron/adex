export default async function CancelCampaignSubscription(subscriptionId) {
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/cancel-campaign-subscription`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            subscription_id:subscriptionId,
  
          }),
        }
      );
      if (response.status === 200) {
        return true
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }