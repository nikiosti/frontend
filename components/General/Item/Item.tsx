'use client'

import { Card, Group, Text } from '@mantine/core'

import styles from './Item.module.css'
import { Item as ItemType } from '@/types/RestaurantMenu'

export const Item = ({ item, onActionClick }: { item: ItemType; onActionClick: (item: any) => void }) => {
  const handleFindSmallestPrice = (products: ItemType) => {
    if (products.prices.length === 0) return null
    return Math.min(...products.prices.map((product) => product.price))
  }

  return (
    <>
      <Card
        opacity={item.stop_list ? 0.3 : 1}
        p="xs"
        className={styles.card}
        radius="md"
        onClick={() => {
          onActionClick(item)
        }}
      >
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${item.image_url})`,
          }}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <div>
            <Text size="lg" className={styles.title} fw={500} lineClamp={3}>
              {item.name}
            </Text>

            <Group justify="space-between" gap="xs">
              <Group>
                {item.prices.length && (
                  <Text size="sm" className={styles.bodyText}>
                    от {handleFindSmallestPrice(item)} руб
                  </Text>
                )}
                {item.cooking_time && (
                  <Text size="sm" className={styles.bodyText}>
                    ~{item.cooking_time}
                  </Text>
                )}
              </Group>
            </Group>
          </div>
        </div>
      </Card>
    </>
  )
}
