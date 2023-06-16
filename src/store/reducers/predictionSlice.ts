import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IPlaceDetails } from "../../common/interfaces";
import IPredictionState from "../../common/interfaces/predictionState";

const initialState: IPredictionState = {
  history: [],
  text: "",
  autoCompleteResults: [],
  processing: false,
  error: null,
};

export const PredictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    requestAutoCompleteResults: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        text: action.payload,
        processing: true,
      };
    },
    removeAutoCompleteResults: (state) => {
      return {
        ...state,
        autoCompleteResults: [],
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
    addToHistory: (state, action: PayloadAction<IPlaceDetails>) => {
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
  removeAutoCompleteResults,
  fetchAutoCompleteResultsSucess,
  fetchAutoCompleteResultsError,
} = PredictionSlice.actions;

export const selectHistory = (state: RootState) => state.predictions.history;
export const selectAutoCompleteResults = (state: RootState) =>
  state.predictions.autoCompleteResults;
export const selectProcessing = (state: RootState) =>
  state.predictions.processing;

export default PredictionSlice.reducer;
