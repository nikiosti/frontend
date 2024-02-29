'use client'

import { Avatar, Group, Paper, Text } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'

import Link from 'next/link'

export const Viewing = ({ restaurantId }: { restaurantId: string }) => {
  return (
    <Link href={'/menu/' + restaurantId + '/'}>
      <Paper p="xs" radius={12}>
        <Group gap="0.3rem">
          <Avatar>
            <IconEye stroke={1.5} size={20} />
          </Avatar>
          <Text visibleFrom="xs" fw={500} fz={20}>
            Меню
          </Text>
        </Group>
      </Paper>
    </Link>
  )
}
