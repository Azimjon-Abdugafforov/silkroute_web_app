import axios from "@/library/axios";
import type { IRegion } from "@/views/Order/types";

export async function getRegions(): Promise<IRegion[]> {
  try {
    const response = await axios.get('/Region/GetAll');
    return response.data as IRegion[];
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error; 
  }
}

