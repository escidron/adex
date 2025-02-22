
export default async function AddEvidenceToSubscription(campaign_id,evidence) {
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/campaign-evidence`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            evidence,
            campaign_id
          }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        return res;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }