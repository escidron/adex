export default async function GetBankAccounts(companyId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/payments/my-bank-accounts`,
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
      console.log("resss", res);
      const bakAccounts = res.data;
      return bakAccounts;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
