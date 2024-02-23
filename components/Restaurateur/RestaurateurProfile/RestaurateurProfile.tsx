'use client'
import { Group, Paper, Text } from '@mantine/core'

import { useGetData } from '@/hook/useGetData'
import { IconUser } from '@tabler/icons-react'
import Link from 'next/link'

export const RestaurateurProfile = () => {
  const { data } = useGetData('restaurateur', 'restaurateur/')

  return (
    <Link href="/admin/profile">
      <Group gap="0.3rem">
        <IconUser stroke={1.5} size={20} />
        <Text visibleFrom="xs">{data?.name}</Text>
      </Group>
    </Link>
  )
}
