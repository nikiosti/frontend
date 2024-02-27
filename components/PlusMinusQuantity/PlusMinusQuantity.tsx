'use client'

import { IconMinus, IconPlus } from '@tabler/icons-react'
import { Button, Group, Box, Text, ActionIcon } from '@mantine/core'

import { GroupedItem, useMenuStore } from '@/store/Menu/Menu'
import { useShallow } from 'zustand/react/shallow'

export const PlusMinusQuantity = ({ item }: { item: GroupedItem }) => {
  const setQuantity = useMenuStore(useShallow((state) => state.setQuantity))
  return (
    <Group wrap="nowrap" gap="0rem">
      <ActionIcon variant="white" c="dark" onClick={() => setQuantity(item.item.id, item.price, -1)}>
        <IconMinus />
      </ActionIcon>

      <ActionIcon variant="white" c="dark" onClick={() => setQuantity(item.item.id, item.price, 1)}>
        <IconPlus />
      </ActionIcon>
    </Group>
  )
}
