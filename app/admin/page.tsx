'use client'
import { Center, Text, AppShell } from '@mantine/core'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'

const Admin = () => {
  return (
    <AppShell bg="#ecedfd" padding="xs">
      <AppShell.Main pt="xl">
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
