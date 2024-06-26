
export default async function GetPaymentMethod(companyId) {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/my-cards`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include",
          body: JSON.stringify({ companyId: companyId }),

        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        const paymentmethods = res.data
        if(paymentmethods.length > 0){
            return paymentmethods
        }else{
            return []
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  