export default async function GetCompany(id) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/my-company`,
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
        const company = await response.json();
        return company;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  