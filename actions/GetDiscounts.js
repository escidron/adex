
export default async function GetDiscounts(id) {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/discounts`,
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
      const discounts = res
      return discounts;
    } else {
      return null;
    }

  } catch (error) {
    console.log(error);
    return null;
  }
}