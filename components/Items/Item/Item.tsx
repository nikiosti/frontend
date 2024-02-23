'use client'

import { Card, Group, Text } from '@mantine/core'

import styles from './Item.module.css'
import { Item as ItemType } from '@/types/RestaurantMenu'

export const Item = ({ item, onActionClick }: { item: ItemType; onActionClick: (item: any) => void }) => {
  return (
    <>
      <Card
        p="xs"
        shadow="lg"
        className={styles.card}
        radius="md"
        onClick={() => {
          onActionClick(item)
        }}
      >
        <div
          className={styles.image}
          style={{
            backgroundImage: !item.image?.includes('noimage_edaded_placeholder')
              ? `url(http://localhost:8000${item.image})`
              : `url(${item.image}`,
          }}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          <div>
            <Text size="lg" className={styles.title} fw={500}>
              {item.name}
            </Text>

            <Group justify="space-between" gap="xs">
              {item.description && (
                <Text size="sm" className={styles.author} lineClamp={1}>
                  {item.description}
                </Text>
              )}

              <Group gap="lg">
                {item.weight_in_grams && (
                  <Text size="sm" className={styles.bodyText}>
                    {item.weight_in_grams} г
                  </Text>
                )}

                {item.price && (
                  <Text size="sm" className={styles.bodyText}>
                    {item.price} руб
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
