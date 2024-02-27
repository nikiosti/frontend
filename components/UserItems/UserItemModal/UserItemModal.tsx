'use client'

import { ItemPrice, Item as ItemType } from '@/types/RestaurantMenu'
import { ActionIcon, Box, Button, Card, Group, Image, Paper, Text } from '@mantine/core'
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
    <Box mt="xs" key={price.id}>
      <Paper p="xs">
        <Group justify="space-between">
          <div>
            <Text fw={500} fz={20}>
              {price.size_description}
            </Text>
            <Text c="dimmed" fz={14} mb={5}>
              {price.price} BYN
            </Text>
          </div>

          {indexMenuItem === -1 ? (
            <ActionIcon color="green" size="xl" radius={12} onClick={() => addItem(item, price)}>
              <IconPlus />
            </ActionIcon>
          ) : (
            <Button.Group>
              <Button size="xs" onClick={() => setQuantity(items[indexMenuItem].item.id, price, -1)}>
                <IconMinus />
              </Button>

              <Group bg="green">
                <Box w={20}>
                  <Text c="#fff" ta="center" fw={500}>
                    {items[indexMenuItem].quantity}
                  </Text>
                </Box>
              </Group>
              <Button onClick={() => setQuantity(items[indexMenuItem].item.id, price, 1)} size="xs">
                <IconPlus />
              </Button>
            </Button.Group>
          )}
        </Group>
      </Paper>
    </Box>
  )
}

export const UserItemModal = ({ item }: { item: ItemType }) => {
  return (
    <Card padding="xs" radius={12} bg="#F0F0F4">
      <>
        <Image
          src={
            !item.image?.includes('noimage_edaded_placeholder') ? `http://localhost:8000${item.image}` : `${item.image}`
          }
          mah={300}
          radius={12}
        />
      </>
      <Text fw={700} size="xl" mt="xs">
        {item.name}
      </Text>
      <Text mt="md">{item.description}</Text>
      {item?.prices.map((price) => (
        <MenuItemPrices key={price.id} price={price} item={item} />
      ))}
    </Card>
  )
}
