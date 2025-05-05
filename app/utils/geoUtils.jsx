function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Haversine formula to calculate distance between two coordinates
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export function findNearestCity(userLat, userLng, citiesData) {
  let nearestCity = null;
  let minDistance = Infinity;

  citiesData.forEach((city) => {
    const distance = calculateDistance(userLat, userLng, city.latitude, city.longitude);

    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  });

  return {
    ...nearestCity,
    distance: minDistance,
  };
}
