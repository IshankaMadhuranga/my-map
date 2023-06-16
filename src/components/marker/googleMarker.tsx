import { FC } from "react";
import { Marker } from "@react-google-maps/api";
import { IPlaceDetails } from "../../common/interfaces";

const GoogleMarker: FC<IPlaceDetails> = ({ place_id, icon, geometry }) => {
  return (
    <Marker
      key={place_id}
      icon={icon}
      position={{
        lat: geometry?.location?.lat()!,
        lng: geometry?.location?.lng()!,
      }}
    />
  );
};

export default GoogleMarker;
