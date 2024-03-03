'use client'

import { Burger, Group, AppShell, Text, ScrollArea } from '@mantine/core'

import { Categories, CategoryBuilder, RestaurantManager, Restaurants, Restaurateur } from '@/components/Admin'

import { useGetData } from '@/hook/useGetData'
import { useDisclosure } from '@mantine/hooks'
import { UseQueryResult } from '@tanstack/react-query'

import Link from 'next/link'

import { RestaurantMenu } from '@/types/RestaurantMenu'

const RestaurantMenuLayout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData('restaurant_menu', `restaurant_menu/${params.id}/`)

  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 340,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{
        height: 80,
      }}
      padding="xs"
      withBorder={false}
    >
      <AppShell.Navbar py="md" px="xs">
        <AppShell.Section>
          <Group justify="space-between" wrap="nowrap">
            <RestaurantManager />
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          </Group>
        </AppShell.Section>

        <AppShell.Section>
          <Text fz="md" c="dimmed" mt="xs">
            Категории
          </Text>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          <Categories menu={data} />
        </AppShell.Section>

        <AppShell.Section>
          <CategoryBuilder restaurantId={params.id} />
        </AppShell.Section>

        <AppShell.Section>
          <Restaurateur />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Header bg="#F4F4F4">
        <Group h="100%" mx="xs" justify="space-between">
          <Group>
            <Restaurants />
            <Link href={'/menu/' + params?.id}>Меню</Link>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Main bg="#F4F4F4">{children}</AppShell.Main>
    </AppShell>
  )
}

export default RestaurantMenuLayout
