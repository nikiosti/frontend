'use client'
import { Center, Text, AppShell } from '@mantine/core'
import { Restaurants } from '@/components/Admin'

const Admin = () => {
  return (
    <AppShell bg="#F4F4F4" padding="xs">
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
