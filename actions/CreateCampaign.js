
export default async function CreateCampaign(listingProperties) {
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/new-campaign`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            category_id:24,
            title: listingProperties.title,
            description: listingProperties.description,
            company_id: listingProperties.select_business
          }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        console.log('message',res);
        return res;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }