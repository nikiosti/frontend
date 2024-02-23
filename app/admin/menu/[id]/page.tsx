'use client'

//Hooks
import { useGetData } from '@/hook/useGetData'

//Components
import { Items } from '@/components/Items/Items/Items'

//Types
import { UseQueryResult } from '@tanstack/react-query'
import { RestaurantMenu } from '@/types/RestaurantMenu'

import { Center, Stack, Text } from '@mantine/core'
import Image from 'next/image'

const Menu = ({ params }: { params: { id: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData('restaurant_menu', `restaurant_menu/${params.id}/`)

  if (!data?.categories.length) {
    return (
      <Center>
        <Stack align="center">
          <Image alt="Hello" width={250} height={250} src={'/undraw_eating_together_re_ux62.svg'} />
          <Text ta="center">Привет🖐️, создай новую категорию что бы начать</Text>
        </Stack>
      </Center>
    )
  }
  return (
    <div>
      <Items data={data} />
    </div>
  )
}

export default Menu
