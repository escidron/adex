function haversine_distance(mk1, mk2) {
  const R = 3958.8; 

  const lat1 = mk1.lat * (Math.PI / 180);
  const lon1 = mk1.lng * (Math.PI / 180);
  const lat2 = mk2.lat * (Math.PI / 180);
  const lon2 = mk2.lng * (Math.PI / 180);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 

  return distance;
}

export default haversine_distance;