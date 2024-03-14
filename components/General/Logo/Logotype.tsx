'use client'

import { Group, Text, Title, TitleOrder } from '@mantine/core'
import styles from './Logotype.module.css'
export const Logotype = () => {
  return (
    <Group>
      <div className={styles.logo}></div>
      <div>
        <Text>Едадед</Text>
      </div>
    </Group>
  )
}
