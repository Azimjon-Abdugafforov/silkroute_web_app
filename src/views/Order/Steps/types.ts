export interface IOrder {
  id: number;
  employees: any[]; // You may need to specify the type of employees array
  driver: {
    id: number;
    driverPhoto: string | null;
    licensePhoto: string | null;
    dateOfBirth: string;
    driverFullName: string;
    phoneNumber: string;
    truck: {
      id: number;
      truckModel: string;
      truckNumber: string;
      truckStatus: string;
      truckImages: {
        id: number;
        name: string;
        path: string;
      }[];
      manufacturedYear: number;
    };
    isActive: boolean;
    status: string;
    branch: any; 
  };
  client: {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    totalSpent: number;
    numberOfOrders: number;
  };
  status: string;
  startTime: string | null;
  finishTime: string | null;
  email: string,
  phoneNumber : string,
  comment: string | null;
  fullName: string,
  startPoint: {
    lat: string,
    lng: string,
  }, endPoint: {
    lat: string,
    lng: string,
  }, totalAmount: number;
  productImages: any[]; // You may need to specify the type of productImages array
  startImage: any[]; // You may need to specify the type of startImage array
  endImage: any[]; // You may need to specify the type of endImage array
  rating: number | null;
  fromRegion: {
    id: number;
    regionName: string;
    numberOfOrders: number;
  };
  fromDistrict: {
    id: number;
    name: string;
    numberOfOrders: number;
    region: {
      id: number;
      regionName: string;
      numberOfOrders: number;
    };
  };
  toRegion: {
    id: number;
    regionName: string;
    numberOfOrders: number;
  };
  toDistrict: {
    id: number;
    name: string;
    numberOfOrders: number;
    region: {
      id: number;
      regionName: string;
      numberOfOrders: number;
    };
  };
  loadDayTime: string;
  fromLoadTime: string;
  toLoadTime: string;
  createdAt: string;
  paymentType: string;
  services: string[];
  homeType: string;
}
