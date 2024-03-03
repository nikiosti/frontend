'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Image, Text } from '@mantine/core'

export const Restautant = ({ restaurant }: { restaurant: RestaurantMenu | undefined }) => {
  return (
    <div>
      <Image src={restaurant?.image} radius={12} h={320} />

      <Text fw={700} size="xl" my="xs">
        {restaurant?.name}
      </Text>
    </div>
  )
}
