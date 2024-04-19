import axios from "@/library/axios"

export async function postDriver(details: unknown){
  try {
    const {data} = await axios.post('/driver', details,
      {headers: {'Content-Type': 'multipart/form-data'}}
    )
    console.log(data);
    
    return data
  } catch (error) {
    return error
  }
}