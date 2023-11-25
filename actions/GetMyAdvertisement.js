export default async function GetMyAdvertisement(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/my-advertisement`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: id }),
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      if (res.data.length > 0) {
        const myListing = res.data;
        const status = res.status;
        return {myListing,status};
      } else {
        const myListing = []
        const status = {}
        {myListing,status};
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
