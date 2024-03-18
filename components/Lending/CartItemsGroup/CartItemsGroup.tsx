'use client'

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'

interface ItemGroup {
  name: string
  image: string
  price: number
  quantity: number
}

const CartItemGroup = ({ item }: { item: ItemGroup }) => {
  return (
    <Paper p="xs" radius={12} mb="xs" bg="#FFF" withBorder>
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap">
          <Avatar size="md" src={item.image} radius={8} />
          <Text fw={500} fz="md" lineClamp={1}>
            {item.name}
          </Text>
        </Group>

        <Group gap="0.3rem" wrap="nowrap">
          <ActionIcon variant="transparent" color="#000">
            <IconMinus stroke={1} />
          </ActionIcon>
          <Box
            w={30}
            h={30}
            style={{
              borderRadius: 100,
              border: '1px solid #000',
              backgroundColor: '#fff',
            }}
          >
            <Text ta="center" fz={20}>
              {item.quantity}
            </Text>
          </Box>
          <ActionIcon variant="transparent" color="#000">
            <IconPlus stroke={1} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  )
}

export const CartItemsGroup = () => {
  const items: ItemGroup[] = [
    {
      name: 'Харчо',
      image:
        'https://i.lefood.menu/wp-content/uploads/w_images/2022/12/recept-50563-620x413.jpg',
      price: 14,
      quantity: 1,
    },
    {
      name: 'Хинкали с говядиной и зеленью',
      image:
        'https://cdn.foodpicasso.com/assets/2022/10/02/f627819f31b59c863c3f04ec04ed607d---png_420x420:whitepadding15_94310_convert.webp?v2',
      price: 2.7,
      quantity: 4,
    },
    {
      name: 'Хачапури',
      image:
        'https://cdn.foodpicasso.com/assets/2023/11/29/a6bdb40dafdd15d10c3a4a14a05f5552---jpeg_420x420:whitepadding15_94310_convert.webp?v2',
      price: 17.5,
      quantity: 1,
    },
  ]
  return (
    <div>
      {items.map((item, index) => (
        <CartItemGroup key={index} item={item} />
      ))}

      <Paper withBorder p="sm" radius={12}>
        <Text fw={500} fz={20}>
          К оплате 42 рубля
        </Text>
      </Paper>
    </div>
  )
}
