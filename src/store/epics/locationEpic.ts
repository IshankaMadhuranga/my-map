import { Epic, StateObservable, ofType } from "redux-observable";
import {
  catchError,
  map,
  switchMap,
  Observable,
  withLatestFrom,
  from,
} from "rxjs";
import {
  fetchAutoCompleteResultsError,
  fetchAutoCompleteResultsSucess,
  requestAutoCompleteResults,
} from "../reducers/locationSlice";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "..";

const service = new google.maps.places.AutocompleteService();

const getPredictions = (place: string) => {
  return new Promise((resolve, reject) => {
    service.getQueryPredictions(
      {
        input: place,
      },
      (
        predictions: google.maps.places.QueryAutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(predictions);
        } else {
          reject("Error: " + status);
        }
      }
    );
  });
};

const fetchDataEpic: Epic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(requestAutoCompleteResults.type),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      console.log(state.locations);
      const text = "Batapola";
      return from(getPredictions(text)).pipe(
        map((response) => {
          console.log("response", response);
          return fetchAutoCompleteResultsSucess(response);
        }),
        catchError((error) =>
          from([fetchAutoCompleteResultsError(error.message)])
        )
      );
    })
  );

export default fetchDataEpic;
