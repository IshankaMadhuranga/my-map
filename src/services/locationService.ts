import { IPlaceDetails } from "../common/interfaces";

const service = new google.maps.places.AutocompleteService();

export const getPredictions = (place: string) => {
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

export const getDetails = (place: string): Promise<IPlaceDetails> => {
  const detailService = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  return new Promise((resolve, reject) => {
    detailService.getDetails(
      {
        placeId: place,
      },
      (
        placeDetails: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          placeDetails
        ) {
          const {
            place_id = "",
            geometry,
            icon,
            formatted_address,
          } = placeDetails;
          resolve({ place_id, geometry, icon, formatted_address });
        } else {
          reject("Error: " + status);
        }
      }
    );
  });
};
