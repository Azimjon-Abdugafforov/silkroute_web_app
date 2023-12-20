import { getDistricts, getDistrictsByRegion } from '@/services/districtService'
import { IDistrict } from '@/views/Order/types'
import { defineStore } from 'pinia'



export const useDistrictStore = defineStore('district', ({
  state: () => ({
    districts: [] as IDistrict[],
    districtsByRegion: [] as IDistrict[],
    toDistricts: [] as IDistrict[]
  }),
  actions: {
    async getDsitrict() {
      try {
        const data = await getDistricts();
        this.districts = data
      } catch (error) {
        console.log(error)
      }
    },
    async getDistrictByRegion(id: number) {
      console.log(id)
      try {
        const data = await getDistrictsByRegion(id)
        this.districtsByRegion = data
      } catch (error) {
        console.log(error)
      }
    },
    async getDistric(id: number){
      try {
        const data = await getDistrictsByRegion(id)
        this.toDistricts = data
      } catch (error) {
        console.log(error)
      }
    }

  }
}))