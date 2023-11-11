export default async function GetUserProfile() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/user-profile`,
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
      const user = await response.json();
      console.log("user", user);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
