import axios from "axios";

export default async function GetMyAdvertisement(token, id) {
  console.log("getadversitmetoken", token);
  try {
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
    //   { id: id },
    //   {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }
    // );

    // const myListing = response.data.data[0];
    // return myListing;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
      {
        method: "POST",
        headers: {
          Cookie: `jwt=${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'        
        },
        credentials: "include",
        body: JSON.stringify({ id: id }),
      }
    );

    if (response.status === 200) {
      const myListing = await response.json();
      return myListing;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
