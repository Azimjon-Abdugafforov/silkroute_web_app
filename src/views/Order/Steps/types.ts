export interface IOrder {
  fromRegion: {
    id: number,
  },
  rooms: string,
  fromDistrict: {
    id : number,
  },
  toRegion: {
    id : number,
  },
  toDistrict: {
    id : number,
  },
  loadDayTime: Date,
  fromLoadTime: string,
  toLoadTime: string,
  startPoint: {
    lat: number,
    lng: number,
  },
  status: string,
  endPoint: {
    lat: number,
    lng: number,
  },
  paymentType: string,
  services: string[],
  homeType: string,
  email: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
}