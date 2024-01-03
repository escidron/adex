export default async function GetImageGallery(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/api/users/get-image-gallery`,
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
      const imageGallery = res.galleryWithImages;
      if (imageGallery.length > 0) {
        return imageGallery;
      } else {
        return [];
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
