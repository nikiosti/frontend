'use client'

import { Group, Text, Title, TitleOrder } from '@mantine/core'
import styles from './Logotype.module.css'
export const Logotype = ({ order }: { order: TitleOrder }) => {
  return (
    <Group>
      <div className={styles.logo}></div>
      <div>
        <Title order={order} fz={24}>
          Едадед
        </Title>
        <Text c="dimmed">Электронное меню</Text>
      </div>
    </Group>
  )
}
