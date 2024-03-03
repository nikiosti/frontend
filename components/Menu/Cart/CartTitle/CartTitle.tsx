'use client'

import { Group, Paper, Text } from '@mantine/core'

import styles from './CartTitle.module.css'
export const CartTitle = ({ clearItems }: { clearItems: () => void }) => {
  return (
    <Paper p="md" radius={12} bg="#F4F4F4">
      <Group justify="space-between">
        <Text size="xl" fw={700}>
          Корзина
        </Text>
        <Text c="dimmed" onClick={clearItems} className={styles.clear}>
          Очистить
        </Text>
      </Group>
    </Paper>
  )
}
