import axios from "axios";

export default async function GetMessages() {
    
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/messages`,
      { }, {
      withCredentials: true,
    })
      .then(function (response) {
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
      });
}
