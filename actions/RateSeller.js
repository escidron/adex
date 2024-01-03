export default async function RateSeller(seller_id,company_id,contract_id,rating,comments) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/rate-seller`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ 
            seller_id: seller_id,
            company_id:company_id,
            contract_id:contract_id,
            rating:rating,
            comments:comments 
          }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        const message = res.message
        return message;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }