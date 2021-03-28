export interface IGeolocation {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

export interface IProps {
  geolocation: IGeolocation;
  changeGeolocation(geolocation: IGeolocation): void;
}
