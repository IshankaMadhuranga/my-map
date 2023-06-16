import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface PlaceDetails {
  formatted_address?: string;
  place_id: string;
  icon?: string;
  geometry?: google.maps.places.PlaceGeometry;
}
interface LocationState {
  readonly history: PlaceDetails[];
  readonly id: string | null;
  readonly text: string;
  readonly autoCompleteResults: google.maps.places.QueryAutocompletePrediction[];
  readonly detailResults: PlaceDetails | null;
  readonly processing: boolean;
  readonly error: string | null;
}

const initialState: LocationState = {
  history: [],
  id: "",
  text: "",
  autoCompleteResults: [],
  detailResults: null,
  processing: false,
  error: null,
};

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    requestAutoCompleteResults: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        text: action.payload,
        processing: true,
      };
    },
    fetchAutoCompleteResultsSucess: (
      state,
      action: PayloadAction<google.maps.places.QueryAutocompletePrediction[]>
    ) => {
      return {
        ...state,
        autoCompleteResults: action.payload,
        processing: false,
      };
    },
    fetchAutoCompleteResultsError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        autoCompleteResults: [],
        processing: false,
      };
    },
    requestDetailResults: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        id: action.payload,
        autoCompleteResults: [],
        processing: true,
        error: null,
      };
    },
    requestDetailResultsSucess: (
      state,
      action: PayloadAction<PlaceDetails>
    ) => {
      return {
        ...state,
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
    addToHistory: (state, action: PayloadAction<PlaceDetails>) => {
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    },
  },
});

export const {
  addToHistory,
  requestAutoCompleteResults,
  fetchAutoCompleteResultsSucess,
  fetchAutoCompleteResultsError,
  requestDetailResults,
  requestDetailResultsSucess,
  requestDetailResultsError,
} = LocationSlice.actions;

export const selectHistory = (state: RootState) => state.locations.history;
export const selectAutoCompleteResults = (state: RootState) =>
  state.locations.autoCompleteResults;
export const selectDetailResults = (state: RootState) =>
  state.locations.detailResults;
export const selectProcessing = (state: RootState) =>
  state.locations.processing;

export default LocationSlice.reducer;
