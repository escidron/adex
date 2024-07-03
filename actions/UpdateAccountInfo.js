

export default async function UpdateStripeAccountInfo(updatedInfo) {
  console.log('entrouu')
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/update-account-stripe-info`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            idNumber: updatedInfo.idNumber.replace(/-/g, '')
          }),
        }
      );
  
      if (response.status === 200) {
        const res = await response.json();
        return res
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  