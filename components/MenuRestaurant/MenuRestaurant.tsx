'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Image, Text } from '@mantine/core'

import styles from './MenuRestautant.module.css'

export const MenuRestautant = ({ restaurant }: { restaurant: RestaurantMenu | undefined }) => {
  return (
    <div className={styles.card}>
      <Image src={restaurant?.image} radius={12} h={320} />

      <Text fw={700} size="xl">
        {restaurant?.name}
      </Text>
    </div>
  )
}
