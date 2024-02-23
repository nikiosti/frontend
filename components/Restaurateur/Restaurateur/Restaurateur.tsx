'use client'
import { useGetData } from '@/hook/useGetData'
import { Avatar, Button, Divider, Group, Text } from '@mantine/core'

export const Restaurateur = () => {
  const { data } = useGetData('restaurateur', 'restaurateur/')
  return (
    <>
      <Group justify="space-between">
        <Group>
          <Avatar src={'http://localhost:8000/' + data?.image} size={55}></Avatar>
          <div>
            <Text>{data?.name}</Text>
            <Text>{data?.job_title}</Text>
          </div>
        </Group>
        <Button color="red" variant="light" radius={12} fw={400}>
          Выйти
        </Button>
      </Group>
    </>
  )
}
