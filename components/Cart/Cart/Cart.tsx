'use client'

import { Avatar, Group, Indicator, Paper, Text } from '@mantine/core'

import { useShallow } from 'zustand/react/shallow'
import { useMenuStore } from '@/store/Menu/Menu'
import { PlusMinusQuantity } from '@/components/PlusMinusQuantity/PlusMinusQuantity'

export const Cart = () => {
  const items = useMenuStore(useShallow((state) => state.items))

  if (!items.length) {
    return (
      <Text c="dimmed" m="md" fw={500} size="xl">
        В вашей корзине пока пусто
      </Text>
    )
  }

  return (
    <>
      {items.map((item, index) => (
        <Paper key={index} radius={12} p="xs" my="xs" bg="#F4F4F4">
          <Group justify="space-between" wrap="nowrap">
            <Group wrap="nowrap">
              <Indicator size={20} label={item.quantity} color="dark">
                <Avatar radius={8} src={item.item.image_url} size={55} />
              </Indicator>
              <div>
                <Text fw={500} lineClamp={1}>
                  {item.item.name}
                </Text>
                <Text c="dimmed">{item.price.price} рублей</Text>
              </div>
            </Group>
            <PlusMinusQuantity item={item} />
          </Group>
        </Paper>
      ))}
    </>
  )
}
