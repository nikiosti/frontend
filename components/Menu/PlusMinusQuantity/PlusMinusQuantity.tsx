'use client'

import { IconMinus, IconPlus } from '@tabler/icons-react'
import { Group, ActionIcon } from '@mantine/core'

import { GroupedItem, useMenuStore } from '@/store/Menu/Menu'
import { useShallow } from 'zustand/react/shallow'

export const PlusMinusQuantity = ({ item }: { item: GroupedItem }) => {
  const setQuantity = useMenuStore(useShallow((state) => state.setQuantity))
  return (
    <Group wrap="nowrap" gap={0}>
      <ActionIcon variant="transparent" c="dark" onClick={() => setQuantity(item.item.id, item.price, -1)}>
        <IconMinus stroke={1} />
      </ActionIcon>

      <ActionIcon variant="transparent" c="dark" onClick={() => setQuantity(item.item.id, item.price, 1)}>
        <IconPlus stroke={1} />
      </ActionIcon>
    </Group>
  )
}
