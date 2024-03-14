'use client'
import { Center, Avatar, Text, Paper } from '@mantine/core'
export const VariablePricing = () => {
  return (
    <>
      <Center>
        <Avatar size={130} src="/hachapuri.webp" />
      </Center>
      <Text my="xs" ta="center" fw={500} fz={20}>
        Хачапури по-аджарски
      </Text>
      <Center>
        <Paper withBorder radius={100} p="xs" mr="xs">
          350 грамм, 17 руб
        </Paper>

        <Paper withBorder radius={100} p="xs">
          700 грамм, 24 руб
        </Paper>
      </Center>
    </>
  )
}
