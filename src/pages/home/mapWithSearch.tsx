import React, { FC, useState, useEffect, useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  requestAutoCompleteResults,
  selectAutoCompleteResults,
} from "../../store/reducers/locationSlice";

const MapWithSearchBox: FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [history, setHistory] = useState<google.maps.places.PlaceResult[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);

  const dispatch = useDispatch();
  const autoCompleteResults = useSelector(selectAutoCompleteResults);

  useEffect(() => {
    dispatch(requestAutoCompleteResults("batapola"));
  }, []);

  useEffect(() => {
    if (place) {
      const index = history.findIndex((ele) => ele.place_id == place.place_id);
      if (index === -1) {
        setHistory((prv) => [place, ...prv]);
      }
    }
  }, [place]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const setUpMap = (value: google.maps.places.PlaceResult) => {
    setPlace(value);
    const { geometry, formatted_address } = value;
    const loc = geometry?.location;
    if (map && loc) {
      map.panTo(loc);
      map.setZoom(10);
    }
    if (formatted_address) setSearchText(formatted_address);
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
    >
      <Input
        type="text"
        placeholder="Search places..."
        onFocus={() => setLoading(true)}
        onBlur={() => setLoading(false)}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: "16rem",
          margin: "0.1rem",
        }}
        size="large"
        suffix={<CloseOutlined onClick={() => setSearchText("")} />}
      />

      {place && (
        <Marker
          key={place.place_id}
          position={{
            lat: place.geometry?.location?.lat()!,
            lng: place.geometry?.location?.lng()!,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapWithSearchBox;
