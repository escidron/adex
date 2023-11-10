import axios from "axios";

export default async function GetMyAdvertisement(token, id) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
      { id: id },
      {
        withCredentials: true,
        headers: {
          Cookie: `jwt=${token}`, 
        },
      }
    );

    const myListing = response.data.data[0];
    return myListing;
  } catch (error) {
    console.log(error);
    return null;
  }
}
