import React, { FC, useState, useEffect, useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  PlaceDetails,
  addToHistory,
  requestAutoCompleteResults,
  requestDetailResults,
  selectAutoCompleteResults,
  selectDetailResults,
  selectHistory,
} from "../../store/reducers/locationSlice";

const MapWithSearchBox: FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);

  const dispatch = useDispatch();
  const autoCompleteResults = useSelector(selectAutoCompleteResults);
  const detailResults = useSelector(selectDetailResults);
  const history = useSelector(selectHistory);

  useEffect(() => {
    if (searchText.length > 0) {
      dispatch(requestAutoCompleteResults(searchText));
    }
  }, [searchText]);

  useEffect(() => {
    if (autoCompleteResults.length > 0) {
      const castedValues = autoCompleteResults.map(
        ({ description, place_id }) => ({
          label: description,
          value: place_id ?? "",
        })
      );
      setOptions(castedValues);
    }
  }, [autoCompleteResults]);

  useEffect(() => {
    if (detailResults) {
      setUpMap(detailResults);

      const index = history.findIndex(
        (ele) => ele.place_id == detailResults.place_id
      );
      if (index === -1) {
        addToHistory(detailResults);
        const newObj = {
          label: "Recent search - " + detailResults.formatted_address ?? "",
          value: detailResults.place_id,
        };
        setOptions((prv) => [...prv, newObj]);
      }
    }
  }, [detailResults]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const setUpMap = (value: PlaceDetails) => {
    const loc = value?.geometry?.location;
    if (map && loc) {
      map.panTo(loc);
      map.setZoom(10);
    }
  };

  const onSelect = (
    value: string,
    option: { label: string; value: string }
  ) => {
    setValue(option.label);
    dispatch(requestDetailResults(value));
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
    >
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={(text) => setSearchText(text)}
        onChange={onChange}
        placeholder="Search places..."
        // onClear={() => alert("clear")}
        allowClear
      />

      {detailResults && (
        <Marker
          key={detailResults.place_id}
          icon={detailResults.icon}
          position={{
            lat: detailResults.geometry?.location?.lat()!,
            lng: detailResults.geometry?.location?.lng()!,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapWithSearchBox;
