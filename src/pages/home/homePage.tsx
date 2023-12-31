import { FC, useState, useEffect, useMemo, CSSProperties } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  requestDetailResults,
  selectDetailResults,
} from "../../store/reducers/locationSlice";

import {
  addToHistory,
  requestAutoCompleteResults,
  selectHistory,
  selectAutoCompleteResults,
} from "../../store/reducers/predictionSlice";
import { IDropDown } from "../../common/interfaces";
import GoogleMarker from "../../components/marker";

const mapContainerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const HomePage: FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placeValue, setPlaceValue] = useState("");
  const [options, setOptions] = useState<IDropDown[]>([]);

  const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);

  const dispatch = useDispatch();
  const autoCompleteResults = useSelector(selectAutoCompleteResults);
  const detailResults = useSelector(selectDetailResults);
  const history = useSelector(selectHistory);

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
    if (history.length > 0) {
      if (autoCompleteResults.length > 0) {
        const newObjs: IDropDown[] = [];

        history.forEach((his) => {
          const recentIndex = autoCompleteResults.findIndex(
            (ele) => ele.place_id == his.place_id
          );
          if (recentIndex === -1) {
            const newObj = {
              label: "Recent search - " + his.formatted_address ?? "",
              value: his.place_id,
            };
            newObjs.push(newObj);
          }
        });
        if (newObjs.length > 0) {
          setOptions((prv) => [...prv.concat(newObjs)]);
        }
      }
    }
  }, [history, autoCompleteResults]);

  useEffect(() => {
    if (detailResults) {
      const loc = detailResults?.geometry?.location;
      if (map && loc) {
        map.panTo(loc);
        map.setZoom(10);
      }

      const index = history.findIndex(
        (ele) => ele.place_id == detailResults.place_id
      );
      if (index === -1) {
        dispatch(addToHistory(detailResults));
      }
    }
  }, [detailResults]);

  const onSelect = (
    value: string,
    option: { label: string; value: string }
  ) => {
    setPlaceValue(option.label);
    dispatch(requestDetailResults(value));
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      onLoad={setMap}
    >
      <AutoComplete
        value={placeValue}
        options={autoCompleteResults.length ? options : []}
        className="page-search"
        onSelect={onSelect}
        onSearch={(text) => {
          if (text.length > 1) {
            dispatch(requestAutoCompleteResults(text));
          }
        }}
        onChange={setPlaceValue}
        size="large"
        placeholder="Search places..."
        allowClear
      />

      {detailResults && <GoogleMarker {...detailResults} />}
    </GoogleMap>
  );
};

export default HomePage;
