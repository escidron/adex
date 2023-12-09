export default async function GetPayoutMethod(companyId) {
  console.log('[GetPayoutMethod]',companyId)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/external-account`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ companyId: companyId }),

      }
    );
    if (response.status === 200) {
      const res = await response.json();
      if (res.data) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
