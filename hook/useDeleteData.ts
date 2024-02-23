import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '@/service/axiosInstance'

const deleteData = async (key: string) => {
  const { data } = await axiosClient.delete(key)
  return data
}

const useDeleteData = (qKey: string[]) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (key: string) => deleteData(key),
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

export { useDeleteData }
