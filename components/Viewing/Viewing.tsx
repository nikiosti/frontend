'use client'

import { Group, Paper, Text } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'

import Link from 'next/link'

export const Viewing = ({ restaurantId }: { restaurantId: string }) => {
  return (
    <Link href={'/menu/' + restaurantId + '/'}>
      <Group gap="0.3rem">
        <IconEye stroke={1.5} size={20} />
        <Text visibleFrom="xs" fw={14}>
          Меню
        </Text>
      </Group>
    </Link>
  )
}
