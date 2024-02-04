export default async function SendChatMessage(
  sended_by,
  seller_id,
  buyer_id,
  advertisement_id,
  message,
  filesNames
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/send-message`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          sended_by: sended_by,
          seller_id: seller_id,
          buyer_id: buyer_id,
          advertisement_id: advertisement_id,
          message: message,
          filesNames : filesNames
        }),
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      const message = res.message;
      return message;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
