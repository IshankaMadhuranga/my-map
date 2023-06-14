import React, { FC, useState, useEffect, useRef, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Input, InputRef, List } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const MapWithSearchBox: FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [history, setHistory] = useState<google.maps.places.PlaceResult[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const searchBoxRef = useRef<InputRef>(null);
  const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);
  const lib = useMemo(
    (): [
      "places" | "geometry" | "drawing" | "localContext" | "visualization"
    ] => ["places"],
    []
  );

  useEffect(() => {
    if (place) {
      const index = history.findIndex((ele) => ele.place_id == place.place_id);
      if (index === -1) {
        setHistory((prv) => [place, ...prv]);
      }
    }
  }, [place]);

  useEffect(() => {
    if (searchBoxRef.current && searchBox) {
      if (map) {
        searchBox.bindTo("bounds", map);
      }
    }
  }, [searchBox]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onPlacesChanged = () => {
    if (searchBox) {
      const newPlaces = searchBox.getPlaces();
      if (newPlaces && newPlaces.length > 0) {
        setUpMap(newPlaces[0]);
      }
    }
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

  const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCJ5h9WRg7u-D_FRqGW67mhsFO9tKBkkpo"
      libraries={lib}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
      >
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <List
            header={
              <Input
                type="text"
                placeholder="Search places..."
                onFocus={() => setLoading(true)}
                onBlur={() => setLoading(false)}
                ref={searchBoxRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  width: "16rem",
                  margin: "0.1rem",
                }}
                size="large"
                suffix={<CloseOutlined onClick={() => setSearchText("")} />}
              />
            }
            style={{
              position: "absolute",
              left: "12rem",
              width: "20rem",
              marginTop: "0.7rem",
              backgroundColor: "white",
            }}
            bordered
            loading={loading ? true : false}
            dataSource={history}
            renderItem={(item: google.maps.places.PlaceResult) => (
              <List.Item
                style={{
                  backgroundColor: "whitesmoke",
                  cursor: "pointer",
                }}
                onClick={() => setUpMap(item)}
              >
                {item.formatted_address}
              </List.Item>
            )}
          />
        </StandaloneSearchBox>

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
    </LoadScript>
  );
};

export default MapWithSearchBox;
