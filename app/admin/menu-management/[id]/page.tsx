'use client'

import { Center, Text } from '@mantine/core'
//Hooks
import { useGetData } from '@/hook/useGetData'
//Components
import { Items } from '@/components/Admin'

//Types
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { UseQueryResult } from '@tanstack/react-query'

const Menu = ({ params }: { params: { id: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData('restaurant_menu', `restaurant_menu/${params.id}/`)

  if (!data?.categories.length) {
    return (
      <div>
        <Center h="75vh">
          <Text fw={500} fz="lg">
            Создайте новою категорию
          </Text>
        </Center>
      </div>
    )
  }

  return <Items data={data} />
}

export default Menu
