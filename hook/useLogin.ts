import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const postUserData = async (datas: { username: string; password: string }) => {
  const { data } = await axios.post('http://localhost:8000/api/token/', datas)
  return data
}

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (datas: { username: string; password: string }) => postUserData(datas),
  })

  return mutation
}
