'use client'
import { useGetData } from '@/hook/useGetData'
import { Avatar, Box, Button, Card, SimpleGrid, Text } from '@mantine/core'
import { useRouter } from 'next/navigation'
export const Restaurateur = () => {
  const { data } = useGetData('restaurateur', 'restaurateur/')

  const router = useRouter()
  return (
    <SimpleGrid>
      <Card radius={12} maw={300}>
        <Avatar src={'http://localhost:8000/' + data?.image} size="xl"></Avatar>

        <Box mt="xs">
          <Text fw={500} fz="xl">
            {data?.name}
          </Text>
          <Text c="dimmed">{data?.job_title}</Text>
        </Box>
      </Card>

      <Button
        maw={300}
        fullWidth
        color="red"
        variant="light"
        radius={12}
        fw={400}
        onClick={() => {
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          router.push('/login')
        }}
      >
        Выйти
      </Button>
    </SimpleGrid>
  )
}
