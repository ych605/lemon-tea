import { GoogleMapAPI, MapNumberCoordinate } from "../types/map";

export const getDirectionsServiceLocations = (
  googleMapAPI: GoogleMapAPI,
  path: MapNumberCoordinate[],
) => {
  const locations = path.map(([latitude, longitude]) => ({
    location: new googleMapAPI.maps.LatLng({ lat: latitude, lng: longitude }),
  }));

  return {
    origin: locations.shift(),
    waypoints: locations,
    destination: locations.pop(),
  };
};
