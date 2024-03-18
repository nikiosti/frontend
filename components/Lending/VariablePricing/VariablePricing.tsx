'use client'
import { Center, Avatar, Text, Paper, Group } from '@mantine/core'
export const VariablePricing = () => {
  return (
    <Group wrap="nowrap">
      <Center>
        <Avatar size={80} src="/hachapuri.webp" />
      </Center>
      <div>
        <Text my="xs" fw={500} fz={18}>
          Хачапури по-аджарски
        </Text>

        <Group wrap="nowrap">
          <Paper withBorder radius={100} p="xs">
            <Text fz="xs">350 грамм</Text>
          </Paper>
          <Paper withBorder radius={100} p="xs">
            <Text fz="xs">700 грамм</Text>
          </Paper>
        </Group>
      </div>
    </Group>
  )
}
