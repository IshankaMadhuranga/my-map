import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface LocationState {
  readonly history: google.maps.places.PlaceResult[];
  readonly locationId: string;
  readonly processing: boolean;
  readonly error?: string | null;
}

const initialState: LocationState = {
  history: [],
  locationId: "",
  processing: false,
  error: null,
};

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addToHistory: (
      state,
      action: PayloadAction<google.maps.places.PlaceResult>
    ) => {
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    },
    setSelectedHistory: (
      state,
      action: PayloadAction<google.maps.places.PlaceResult>
    ) => {
      return {
        ...state,
        locationId: action.payload.place_id ?? "",
      };
    },
    deleteAllLocations: (state) => {
      return { ...state, history: [] };
    },
  },
});

export const { addToHistory, deleteAllLocations, setSelectedHistory } =
  LocationSlice.actions;

export const selectHistory = (state: RootState) => state.locations.history;
export const selectLocationId = (state: RootState) =>
  state.locations.locationId;

export default LocationSlice.reducer;
