'use client'

import { Group, Paper, Text } from '@mantine/core'

export const CartTitle = ({ clearItems }: { clearItems: () => void }) => {
  return (
    <Paper p="md" radius={12}>
      <Group justify="space-between">
        <Text size="xl" fw={700}>
          Корзина
        </Text>
        <Text c="dimmed" onClick={clearItems}>
          Очистить
        </Text>
      </Group>
    </Paper>
  )
}
