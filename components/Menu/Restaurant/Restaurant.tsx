'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Image, Text } from '@mantine/core'

import styles from './Restautant.module.css'
export const Restautant = ({ restaurant }: { restaurant: RestaurantMenu | undefined }) => {
  return (
    <div className={styles.card}>
      <div
        style={{
          backgroundImage: `url(${restaurant?.image})`,
        }}
        className={styles.image}
      />

      <div className={styles.overlay} />
      <div className={styles.content}>
        <Text className={styles.title}>{restaurant?.name}</Text>
        <Text className={styles.bodyText}>{restaurant?.address}</Text>
      </div>
    </div>
  )
}
