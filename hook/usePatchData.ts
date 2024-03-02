import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '@/service/axiosInstance'

interface Params {
  key: string
  datas: FormData
}

const patchData = async (params: Params) => {
  const { datas } = params
  const { data } = await axiosClient.patch(params.key, datas)
  return data
}

const usePatchData = (qKey: string[]) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (params: Params) => patchData(params),
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

export { usePatchData }
