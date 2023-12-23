export default async function GetUserProfile(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
      {
        method: id ? "POST" : "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: id ? JSON.stringify({ id: id }) : null

      }
    );
    if (response.status === 200) {
      const user = await response.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
