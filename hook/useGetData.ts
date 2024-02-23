import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/service/axiosInstance'

const getData = async (key: string) => {
  const { data } = await axiosClient.get(key)
  return data
}

const useGetData = (qKey: string, key: string) => {
  const query = useQuery({
    queryFn: () => getData(key),
    queryKey: [qKey],
  })

  return query
}

export { useGetData }
