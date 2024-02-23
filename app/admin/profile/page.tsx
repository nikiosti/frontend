'use client'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'
import { Restaurateur } from '@/components/Restaurateur/Restaurateur/Restaurateur'

import { AppShell, Group } from '@mantine/core'

const Profile = () => {
  return (
    <AppShell header={{ height: 80 }} padding="md" withBorder={false}>
      <AppShell.Header>
        <Group h="100%" p="md">
          <Restaurants />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Restaurateur />
      </AppShell.Main>
    </AppShell>
  )
}

export default Profile
