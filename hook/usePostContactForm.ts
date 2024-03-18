import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '@/service/url'

interface ContactForm {
  name: string
  email: string
  phoneOrMessenger: string
}

const postUserData = async (datas: ContactForm) => {
  const { data } = await axios.post(BASE_URL + 'bid/', datas)
  return data
}

export const usePostContactForm = () => {
  const mutation = useMutation({
    mutationFn: (datas: ContactForm) => postUserData(datas),
  })

  return mutation
}
