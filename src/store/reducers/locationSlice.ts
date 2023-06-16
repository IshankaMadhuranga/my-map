import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface PlaceDetails {
  formatted_address?: string;
  place_id: string;
  icon?: string;
  geometry?: google.maps.places.PlaceGeometry;
}
interface LocationState {
  readonly id: string | null;
  readonly detailResults: PlaceDetails | null;
  readonly processing: boolean;
  readonly error: string | null;
}

const initialState: LocationState = {
  id: "",
  detailResults: null,
  processing: false,
  error: null,
};

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    requestDetailResults: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        id: action.payload,
        processing: true,
        error: null,
      };
    },
    requestDetailResultsSucess: (
      state,
      action: PayloadAction<PlaceDetails>
    ) => {
      return {
        detailResults: action.payload,
        id: "",
        processing: false,
        error: null,
      };
    },
    requestDetailResultsError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        detailResults: null,
        processing: false,
        error: action.payload,
      };
    },
  },
});

export const {
  requestDetailResults,
  requestDetailResultsSucess,
  requestDetailResultsError,
} = LocationSlice.actions;

export const selectDetailResults = (state: RootState) =>
  state.locations.detailResults;
export const selectProcessing = (state: RootState) =>
  state.locations.processing;

export default LocationSlice.reducer;
