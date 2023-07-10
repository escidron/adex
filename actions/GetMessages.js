import axios from "axios";

export default async function GetMessages() {
    
    axios.post('http://localhost:8000/api/advertisements/messages',
      { }, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (response) {
        console.log('ad details', response.data.data)
        return response.data.data
      })
      .catch(function (error) {
        console.log(error)
      });
}
