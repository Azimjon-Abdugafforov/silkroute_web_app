import { defineStore } from "pinia";
import type { IRegion } from "@/views/Order/types";
import { getRegions, getBranches } from "@/services/regionService";

export const useRegionStore = defineStore("regions", {
  state: () => ({
    regions: [] as IRegion[],
    branches: [] as any[],
  }),
  actions: {
    async getRegion() {
      const data = await getRegions();
      this.regions = data;
      console.log(this.regions)
      return data
    },  
    async getBranch() {
      const data = await getBranches();
      this.branches = data;
      return data
    },
  },
});
