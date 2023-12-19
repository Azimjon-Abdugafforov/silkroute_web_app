import axios from "@/library/axios";
import type { IDistrict } from "@/views/Order/types";

export async function getDistricts(): Promise<IDistrict[]> {
  try {
    const res = await axios.get('/District/GetAll');
    return res.data as IDistrict[];
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error; 
  }
}
export async function getDistrictsByRegion(id:number): Promise<IDistrict[]>{
  try {
    const res = await axios.get(`/District/ByRegion/${id}`)
    return res.data as IDistrict[]
  } catch (error) {
    console.log(error)
    throw error
  }
}