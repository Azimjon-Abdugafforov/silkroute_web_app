export interface IOrder {
  fromRegion: {
    id: number,
    regionName: string,
  },
  rooms: string,
  fromDistrict: {
    id : number,
    name: string,
  },
  toRegion: {
    id : number,
    regionName: string,

  },
  toDistrict: {
    id : number,
    name: string,
  },
  loadDayTime: string,
  fromLoadTime: string,
  toLoadTime: string,
  startPoint: {
    lat: number,
    lng: number,
  },
  deliveryDate: string,
  status: string,
  endPoint: {
    lat: number,
    lng: number,
  },
  createdAt: string,
  paymentType: string,
  services: string[],
  homeType: string,
  email: string,
  phoneNumber: string,
  firstName: string,
  lastName: string,
}