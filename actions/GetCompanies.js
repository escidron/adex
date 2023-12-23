export default async function GetCompanies() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-companies`,
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
        const companies = res;
        return companies;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  