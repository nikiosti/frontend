'use client'

import { ItemPrice, Item as ItemType } from '@/types/RestaurantMenu'
import { ActionIcon, Box, Button, Card, Group, Image, Indicator, Paper, Text } from '@mantine/core'
import { useMenuStore } from '@/store/Menu/Menu'
import { useShallow } from 'zustand/react/shallow'
import { IconMinus, IconPlus } from '@tabler/icons-react'

const MenuItemPrices = ({ price, item }: { price: ItemPrice; item: ItemType }) => {
  const [items, setQuantity, addItem] = useMenuStore(
    useShallow((state) => [state.items, state.setQuantity, state.addItem])
  )
  const indexMenuItem = items.findIndex(
    (itemButton) => itemButton.item.id === item.id && itemButton.price.id === price.id
  )

  return (
    <Paper p="xs" mt="xs" key={price.id} bg="#F4F4F4">
      <Group justify="space-between" wrap="nowrap">
        <div>
          <Text fw={500}>{price.size_description}</Text>

          <Text c="dimmed" fz={14} mb={5}>
            {price.price} рублей
          </Text>
        </div>

        {indexMenuItem === -1 ? (
          <ActionIcon color="dark" variant="transparent" onClick={() => addItem(item, price)}>
            <IconPlus stroke={1} />
          </ActionIcon>
        ) : (
          <Group wrap="nowrap" gap={0}>
            <ActionIcon
              c="dark"
              variant="transparent"
              onClick={() => setQuantity(items[indexMenuItem].item.id, price, -1)}
            >
              <IconMinus stroke={1} />
            </ActionIcon>
            <div style={{ width: 24, height: 24, borderRadius: '100%', backgroundColor: '#000', color: '#fff' }}>
              <Text ta="center">{items[indexMenuItem].quantity}</Text>
            </div>
            <ActionIcon
              c="dark"
              variant="transparent"
              onClick={() => setQuantity(items[indexMenuItem].item.id, price, 1)}
            >
              <IconPlus stroke={1} />
            </ActionIcon>
          </Group>
        )}
      </Group>
    </Paper>
  )
}

export const UserItemModal = ({ item }: { item: ItemType | undefined }) => {
  return (
    <Card radius={12} padding={0}>
      <Image src={item?.image_url} mah={200} radius={12} />

      {item?.prices.map((price) => (
        <MenuItemPrices key={price.id} price={price} item={item} />
      ))}
      <Text mt="md">{item?.description}</Text>
    </Card>
  )
}
