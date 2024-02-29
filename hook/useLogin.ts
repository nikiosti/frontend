import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_TOKEN } from '@/service/url'

const postUserData = async (datas: { username: string; password: string }) => {
  const { data } = await axios.post(BASE_TOKEN, datas)
  return data
}

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (datas: { username: string; password: string }) => postUserData(datas),
  })

  return mutation
}
