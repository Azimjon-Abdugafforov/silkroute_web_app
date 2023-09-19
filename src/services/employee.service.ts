import axios from '@/library/axios'

export async function getEmployeeList(){
  const {data} = await axios.get(`/Employee`)
  return data
}