import axios from "axios";

export default async function GetCategories() {
  try {
    const response = await  axios(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/list-property`,
        {},
        {
          withCredentials: true,
        }
      )
    const categories= response.data;
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}