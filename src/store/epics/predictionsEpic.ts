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
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getPredictions } from "../../services/locationService";

const predictionsEpic: Epic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(requestAutoCompleteResults.type),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const text = action.payload;
      return from(getPredictions(text)).pipe(
        map((response) => {
          return fetchAutoCompleteResultsSucess(
            response as google.maps.places.QueryAutocompletePrediction[]
          );
        }),
        catchError((error) =>
          from([fetchAutoCompleteResultsError(error.message)])
        )
      );
    })
  );

export default predictionsEpic;
