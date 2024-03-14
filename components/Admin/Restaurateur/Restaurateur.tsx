'use client'
import { ActionIcon, Badge, Group, Text } from '@mantine/core'

import { useGetData } from '@/hook/useGetData'
import { IconLogout } from '@tabler/icons-react'

import { useRouter } from 'next/navigation'

export const Restaurateur = () => {
  const { data } = useGetData('restaurateur', 'restaurateur/')

  const router = useRouter()
  const handleSignOut = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    router.push('/login')
  }

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

      <ActionIcon variant="transparent" radius="xl" color="dark" size={40} onClick={handleSignOut}>
        <IconLogout stroke={1} size={30} />
      </ActionIcon>
    </Group>
  )
}
