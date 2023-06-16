export interface IDropDown {
  label: string;
  value: string;
}

export interface ILayout {
  children: JSX.Element;
}

export interface IPlaceDetails {
  formatted_address?: string;
  place_id: string;
  icon?: string;
  geometry?: google.maps.places.PlaceGeometry;
}
