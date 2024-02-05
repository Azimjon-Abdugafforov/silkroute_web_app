import axios from "@/library/axios";
import type { IRegion } from "@/views/Order/types";

export async function getRegions(): Promise<IRegion[]> {
  try {
    const {data} = await axios.get('/region/getAll');
    console.log('here2');

    return data as IRegion[];
    
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error; 
  }
}
export async function getBranches(){
  try {
    const {data} = await axios.get('/branch/getAll');
    return data
  } catch (error) {
    console.log('Error fetching branches:', error);
    
  }
}

