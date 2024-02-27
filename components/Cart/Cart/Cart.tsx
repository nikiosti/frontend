'use client'

import { Avatar, Center, Group, Indicator, Paper, Text } from '@mantine/core'

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
        <Paper key={index} radius={12} p="xs" my="xs">
          <Group justify="space-between">
            <Group wrap="nowrap">
              <Indicator size={20} label={item.quantity} color="dark">
                <Avatar
                  radius={8}
                  src={
                    !item.item.image?.includes('noimage_edaded_placeholder')
                      ? 'http://localhost:8000' + item.item.image
                      : item.item.image
                  }
                  size={55}
                />
              </Indicator>
              <div>
                <Text fw={500} lineClamp={1} maw={100}>
                  {item.item.name}
                </Text>
                <Text c="dimmed">{item.price.price} BYN</Text>
              </div>
            </Group>
            <PlusMinusQuantity item={item} />
          </Group>
        </Paper>
      ))}
    </>
  )
}
