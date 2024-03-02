'use client'

//Hooks
import { useGetData } from '@/hook/useGetData'
//Components
import { Items } from '@/components/Items/Items/Items'
//Types
import { UseQueryResult } from '@tanstack/react-query'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Center, Text } from '@mantine/core'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'
import Link from 'next/link'

const Menu = ({ params }: { params: { id: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData('restaurant_menu', `restaurant_menu/${params.id}/`)

  if (!data?.categories.length) {
    return (
      <div>
        <Restaurants />
        <Center h="75vh">
          <Text fw={500} fz="lg">
            Создайте новою категорию
          </Text>
        </Center>
      </div>
    )
  }

  return (
    <div>
      <Restaurants />
      <Items data={data} />
    </div>
  )
}

export default Menu
