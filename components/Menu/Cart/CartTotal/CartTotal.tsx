'use client'

import { GroupedItem } from '@/store/Menu/Menu'
import { Paper, Text } from '@mantine/core'

export const CartTotal = ({ items }: { items: GroupedItem[] }) => {
  const totalPrice = items
    .reduce((total, groupedItem) => {
      return total + (groupedItem.price.price || 0) * groupedItem.quantity
    }, 0)
    .toFixed(2)

  return (
    <Paper p="xs" radius={12} bg="#F4F4F4">
      <Text fw={500} size="xl" ta="center">
        Заказ на {totalPrice} рублей
      </Text>
    </Paper>
  )
}
