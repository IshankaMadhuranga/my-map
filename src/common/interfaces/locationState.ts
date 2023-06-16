import { IPlaceDetails } from ".";

interface ILocationState {
  readonly id: string | null;
  readonly detailResults: IPlaceDetails | null;
  readonly processing: boolean;
  readonly error: string | null;
}

export default ILocationState;
