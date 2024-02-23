'use client'

import { GroupedItem } from '@/store/Menu/Menu'
import { Paper, Text } from '@mantine/core'

export const CartTotal = ({ items }: { items: GroupedItem[] }) => {
  const totalPrice = items.reduce((total, groupedItem) => {
    return total + (groupedItem.price.price || 0) * groupedItem.quantity
  }, 0)

  return (
    <Paper bg="#fff" p="xs" radius={12}>
      <Text fw={500} size="xl">
        К оплате {totalPrice} рублей
      </Text>
      <Text c="dimmed" size="sm">
        {items.length} позиции
      </Text>
    </Paper>
  )
}
