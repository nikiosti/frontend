import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '@/service/axiosInstance'
import { Item } from '@/types/RestaurantMenu'



interface Params {
  key: string
  datas: FormData
}

const postData = async (params: Params) => {
  const { datas } = params
  
  const { data } = await axiosClient.post(params.key, datas)
  return data
}

const usePostData = (qKey: string[]) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (params: Params) => postData(params),
    onSuccess: () => {
      qKey.map((key) => {
        queryClient.invalidateQueries({
          queryKey: [key],
        })
      })
    },
  })

  return mutation
}

export { usePostData }
