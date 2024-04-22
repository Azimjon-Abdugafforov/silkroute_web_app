export interface IOrder {
  id: number,
  fromRegion: {
    id: number,
    regionName: string,
  },
  rooms: string,
  fromDistrict: {
    id : number,
    name: string,
  },
  fullName: string,
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
    lat: string,
    lng: string,
  },
  deliveryDate: string,
  status: string,
  endPoint: {
    lat: string,
    lng: string,
  },
  createdAt: string,
  paymentType: string,
  services: string[],
  homeType: string,
  email: string,
  phoneNumber: string,
  firstName: string,
}