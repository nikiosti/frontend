'use client'
import { ActionIcon, Avatar, Badge, Box, Group, Paper, RemoveScroll, Text } from '@mantine/core'

import { useGetData } from '@/hook/useGetData'
import { IconLogout, IconUser } from '@tabler/icons-react'
import Link from 'next/link'

export const RestaurateurProfile = () => {
  const { data } = useGetData('restaurateur', 'restaurateur/')

  return (
    <Group justify="space-between" pt="xs">
      <div>
        <Group gap="0.3rem">
          <Text fz="md" fw={500}>
            {data?.name}
          </Text>
          <Badge bg="dark">PRO</Badge>
        </Group>

        <Text c="dimmed" fz="xs" fw={500}>
          Окончание подписки 23.13.2024
        </Text>
      </div>

      <ActionIcon variant="transparent" radius="xl" color="dark" size={40}>
        <IconLogout stroke={1} size={30} />
      </ActionIcon>
    </Group>
  )
}
