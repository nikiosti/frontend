'use client'

import { Group, Text, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export const SearchMenuItem = () => {
  return (
    <Group gap="1rem">
      {/* <TextInput
        placeholder="Поиск"
        leftSection={<IconSearch stroke={1} size={22} />}
        size="sm"
        maw={300}
        styles={{
          input: {
            backgroundColor: '#E4E4E4',
            border: 0,
          },
        }}
      /> */}
    </Group>
  )
}
