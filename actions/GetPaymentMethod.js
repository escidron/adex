
export default async function GetPaymentMethod() {
    try {
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/my-cards`,
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'        
          },
          credentials: "include"
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        console.log('res payment',res)
        const paymentmethods = res.data
        if(paymentmethods.length > 0){
            return paymentmethods
        }else{
            return []
        }
        // const myListing = res.data[0]
        // return myListing;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  