'use client'

import { IconMinus, IconPlus } from '@tabler/icons-react'
import { Button, Group, Box, Text, ActionIcon } from '@mantine/core'

import { GroupedItem, useMenuStore } from '@/store/Menu/Menu'
import { useShallow } from 'zustand/react/shallow'

export const PlusMinusQuantity = ({ item }: { item: GroupedItem }) => {
  const setQuantity = useMenuStore(useShallow((state) => state.setQuantity))
  return (
    <Group gap="0.3rem">
      <ActionIcon variant="white" c="dark" onClick={() => setQuantity(item.item.id, item.price, -1)}>
        <IconMinus />
      </ActionIcon>

      <Box w={50} h={50} style={{ borderRadius: 12 }} bg="#F0F0F4">
        <Text fw={500} fz={20} ta="center" style={{ lineHeight: 2.5 }}>
          {item.quantity}
        </Text>
      </Box>

      <ActionIcon variant="white" c="dark" onClick={() => setQuantity(item.item.id, item.price, 1)}>
        <IconPlus />
      </ActionIcon>
    </Group>
  )
}
