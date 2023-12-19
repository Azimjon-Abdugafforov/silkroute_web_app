import { defineStore } from "pinia";
import type {IRegion} from '@/views/Order/types'
import {getRegions} from '@/services/regionService'

export const useRegionStore = defineStore('regions', ({
  state:()=> ({
    regions:[] as IRegion []
  }),
  actions:{
    async getRegion(){
      const data = await getRegions()
      this.regions = data;
    }
  }
  

}))