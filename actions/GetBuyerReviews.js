
export default async function GetBuyerReviews(id,companyId) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/get-buyer-reviews`,
        {
          method: "POST",
          headers: {
           
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ id: id,companyId:companyId }),
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        const reviews = res
        return reviews;
      } else {
        return [];
      }
  
    } catch (error) {
      console.log(error);
      return null;
    }
  }