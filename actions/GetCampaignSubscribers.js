export default async function GetCampaignSubscribers(campaignId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/get-campaign-subscribers/${campaignId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
