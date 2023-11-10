import axios from "axios";

export default async function GetDiscounts(token, id) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/discounts`,
      { id: id },
      {
        withCredentials: true,
        headers: {
          Cookie: `jwt=${token}`, 
        },
      }
    );

    const discounts = response.data;
    return discounts;
  } catch (error) {
    console.log(error);
    return null;
  }
}