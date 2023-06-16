import { IPlaceDetails } from ".";

interface IPredictionState {
  readonly history: IPlaceDetails[];
  readonly text: string;
  readonly autoCompleteResults: google.maps.places.QueryAutocompletePrediction[];
  readonly processing: boolean;
  readonly error: string | null;
}

export default IPredictionState;
