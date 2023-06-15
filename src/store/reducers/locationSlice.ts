import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface LocationState {
  readonly history: google.maps.places.PlaceResult[];
  readonly id: string;
  readonly text: string;
  readonly autoCompleteResults: any[];
  readonly detailResults: any[];
  readonly processing: boolean;
  readonly error: string | null;
}

const initialState: LocationState = {
  history: [],
  id: "",
  text: "",
  autoCompleteResults: [],
  detailResults: [],
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
    fetchAutoCompleteResultsSucess: (state, action: PayloadAction<any>) => {
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
        processing: true,
        error: null,
      };
    },
    requestDetailResultsSucess: (state, action: PayloadAction<any[]>) => {
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
        detailResults: [],
        processing: false,
        error: action.payload,
      };
    },
    addToHistory: (
      state,
      action: PayloadAction<google.maps.places.PlaceResult>
    ) => {
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    },

    deleteAllHistory: (state) => {
      return { ...state, history: [] };
    },
  },
});

export const {
  addToHistory,
  deleteAllHistory,
  requestAutoCompleteResults,
  fetchAutoCompleteResultsSucess,
  fetchAutoCompleteResultsError,
  requestDetailResults,
  requestDetailResultsSucess,
  requestDetailResultsError,
} = LocationSlice.actions;

export const selectHistory = (state: RootState) => state.locations.history;
export const selectLocationId = (state: RootState) => state.locations.id;
export const selectAutoCompleteResults = (state: RootState) =>
  state.locations.autoCompleteResults;
export const selectDetailResults = (state: RootState) =>
  state.locations.detailResults;
export const selectProcessing = (state: RootState) =>
  state.locations.processing;

export default LocationSlice.reducer;
