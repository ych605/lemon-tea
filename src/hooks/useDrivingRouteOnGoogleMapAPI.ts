import { useCallback, useEffect, useState } from "react";
import { GoogleMapAPI, MapNumberCoordinate } from "../types/map";
import { getDirectionsServiceLocations } from "../utils/map";

interface useDrivingRouteOnGoogleMapAPIProps {
  googleMapAPI?: GoogleMapAPI;
  path?: MapNumberCoordinate[];
}

export const useDrivingRouteOnGoogleMapAPI = (props: useDrivingRouteOnGoogleMapAPIProps) => {
  const { googleMapAPI, path } = props;
  const [drawnMarkers, setDrawnMarkers] = useState<any[]>();
  const [drawnRoute, setDrawnRoute] = useState<any>();

  const addLocationsMarkers = useCallback(
    (googleMapAPI: GoogleMapAPI, path: MapNumberCoordinate[]) => {
      setDrawnMarkers(
        path.map(
          ([latitude, longitude], index) =>
            new googleMapAPI.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: googleMapAPI.map,
              title: `Location ${index + 1}`,
              label: {
                text: `${index + 1}`,
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
              },
              optimized: true,
            }),
        ),
      );
    },
    [setDrawnMarkers],
  );

  const drawRoute = useCallback(
    (googleMapAPI: GoogleMapAPI, overviewPath: any) => {
      const routeLine = new googleMapAPI.maps.Polyline({
        path: overviewPath,
        geodesic: false,
        strokeColor: "#a67100",
        strokeWeight: 3,
      });
      routeLine.setMap(googleMapAPI.map);

      setDrawnRoute(routeLine);
    },
    [setDrawnRoute],
  );

  const drawDrivingRoute = useCallback(
    (googleMapAPI: GoogleMapAPI, path: MapNumberCoordinate[]) => {
      const DirectionsService = new googleMapAPI.maps.DirectionsService();
      const { origin, waypoints, destination } = getDirectionsServiceLocations(googleMapAPI, path);

      DirectionsService.route(
        {
          origin: origin?.location,
          waypoints,
          destination: destination?.location,
          travelMode: googleMapAPI.maps.TravelMode.DRIVING,
          unitSystem: googleMapAPI.maps.UnitSystem.METRIC,
        },
        (result: any, status: any) => {
          if (status !== googleMapAPI.maps.DirectionsStatus.OK)
            return alert(`Error code: ${status}`);

          const { overview_path: overviewPath, bounds } = result.routes[0];

          addLocationsMarkers(googleMapAPI, path);
          drawRoute(googleMapAPI, overviewPath);
          googleMapAPI.map.fitBounds(bounds);
        },
        (error: any) => {
          alert(
            `Something went wrong in direction service, please try again later.(Error message: ${error?.message || "-"})`,
          );
        },
      );
    },
    [addLocationsMarkers, drawRoute],
  );

  const removeDrivingRoute = useCallback(() => {
    drawnRoute?.setMap(null);

    for (const marker of drawnMarkers || []) {
      marker.setMap(null);
    }
  }, [drawnMarkers, drawnRoute]);

  useEffect(() => {
    if (!path) removeDrivingRoute();
  }, [!path, removeDrivingRoute]);

  useEffect(() => {
    if (!googleMapAPI?.map || !googleMapAPI?.maps || !path) return;

    drawDrivingRoute(googleMapAPI, path);
  }, [googleMapAPI?.map, googleMapAPI?.maps, path]);
};
