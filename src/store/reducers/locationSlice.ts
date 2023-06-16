import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IPlaceDetails } from "../../common/interfaces";
import ILocationState from "../../common/interfaces/locationState";

const initialState: ILocationState = {
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
      action: PayloadAction<IPlaceDetails>
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
