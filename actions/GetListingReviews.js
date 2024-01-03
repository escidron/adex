
export default async function GetListingReviews(id) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/get-listing-reviews`,
        {
          method: "POST",
          headers: {
           
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ id: id }),
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