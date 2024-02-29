'use client'
import { Center, Text, AppShell } from '@mantine/core'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'

const Admin = () => {
  return (
    <AppShell bg="#F0F0F0" padding="xs">
      <AppShell.Main bg="#F0F0F0" pt="xl">
        <Center>
          <div>
            <Text fw={500} fz="xl">
              Выберите заведение или создайте новое
            </Text>
            <Restaurants />
          </div>
        </Center>
      </AppShell.Main>
    </AppShell>
  )
}

export default Admin
