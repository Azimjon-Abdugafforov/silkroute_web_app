import axios from '@/library/axios'

export async function getEmployeeList(){
  try {
    const {data} = await axios.get(`/Employee`)
    return data
  } catch (error) {
    console.log(error)  
  }

}