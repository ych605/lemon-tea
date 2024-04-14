import { useCallback, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useFormContext } from "react-hook-form";
import env from "../../constants/env";
import { API } from "../../types/api";
import { GoogleMapAPI, MapNumberCoordinate } from "../../types/map";
import { useAPIContext } from "../../hooks/useAPIContext";
import { useModalContext } from "../../hooks/useModalContext";
import { useDrivingRouteOnGoogleMapAPI } from "../../hooks/useDrivingRouteOnGoogleMapAPI";
import MapDetailsCard from "./components/MapDetailsCard";

interface MapProps {}

const defaultCenter = {
  lat: 22.396428,
  lng: 114.109497,
};
const defaultZoom = 11;

const Map: React.FC<MapProps> = () => {
  const { reset } = useFormContext();
  const { onOpen } = useModalContext();
  const { submitRoutingRequest, getRoute } = useAPIContext();
  const [googleMapAPI, setGoogleMapAPI] = useState<GoogleMapAPI>();
  const pathWithStringCoordinate = (getRoute?.data?.data as API.GetRoute.SuccessResponse)?.path;
  const pathWithNumberCoordinate = useMemo(
    () =>
      pathWithStringCoordinate?.map<MapNumberCoordinate>(([latitude, longitude]) => [
        Number(latitude),
        Number(longitude),
      ]),
    [pathWithStringCoordinate],
  );

  const onGoogleApiLoaded = useCallback(
    ({ map, maps }: { map: any; maps: any; ref: Element | null }) => {
      setGoogleMapAPI({ map, maps });
    },
    [setGoogleMapAPI],
  );

  const resetMap = useCallback(() => {
    googleMapAPI?.map.setZoom(defaultZoom);
    googleMapAPI?.map.setCenter(defaultCenter);
  }, [googleMapAPI?.map]);

  const onResubmit = useCallback(() => {
    resetMap();
    submitRoutingRequest?.reset();
    reset();
    onOpen();
  }, [submitRoutingRequest?.reset, reset, onOpen, resetMap]);

  useDrivingRouteOnGoogleMapAPI({
    googleMapAPI,
    path: pathWithNumberCoordinate,
  });

  return (
    <div className="relative h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.GOOGLE_MAP_API_ENDPOINT }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        options={{
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          keyboardShortcuts: false,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
      />
      {getRoute?.data?.data.status === API.GetRoute.ResponseStatus.SUCCESS && (
        <MapDetailsCard
          totalDistance={getRoute?.data?.data.total_distance}
          totalTime={getRoute?.data?.data.total_time}
          onResubmit={onResubmit}
        />
      )}
    </div>
  );
};

export default Map;
