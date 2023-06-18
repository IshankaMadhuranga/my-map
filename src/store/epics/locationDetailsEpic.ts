import { Epic, StateObservable, ofType } from "redux-observable";
import {
  catchError,
  Observable,
  withLatestFrom,
  from,
  mergeMap,
  of,
  concatMap,
  concat,
} from "rxjs";
import {
  requestDetailResults,
  requestDetailResultsError,
  requestDetailResultsSucess,
} from "../reducers/locationSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getDetails } from "../../services/locationService";
import { removeAutoCompleteResults } from "../reducers/predictionSlice";
import { IPlaceDetails } from "../../common/interfaces";

const locationDetailsEpic: Epic = (
  action$: Observable<AnyAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(requestDetailResults.type),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(getDetails(action.payload)).pipe(
        concatMap(
          ({ place_id, geometry, icon, formatted_address }: IPlaceDetails) =>
            concat(
              of(
                requestDetailResultsSucess({
                  place_id,
                  geometry,
                  icon,
                  formatted_address,
                })
              ),
              of(removeAutoCompleteResults())
            )
        ),
        catchError((error) => from([requestDetailResultsError(error.message)]))
      );
    })
  );

export default locationDetailsEpic;
