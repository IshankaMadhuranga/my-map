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
  requestDetailResults,
  requestDetailResultsError,
  requestDetailResultsSucess,
} from "../reducers/locationSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getDetails } from "../../services/locationService";

const locationDetailsEpic: Epic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(requestDetailResults.type),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(getDetails(action.payload)).pipe(
        map(({ place_id, geometry, icon, formatted_address }: any) => {
          const data = { place_id, geometry, icon, formatted_address };
          return requestDetailResultsSucess(data);
        }),
        catchError((error) => from([requestDetailResultsError(error.message)]))
      );
    })
  );

export default locationDetailsEpic;
