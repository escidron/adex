export default async function CreateCampaignSubscription(campaignId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/advertisements/create-campaign-subscription`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          campaign_id: campaignId,
        }),
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      const subsriptionId = res.subscriptionId;
      return subsriptionId;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

