'use client'

import { RestaurantManager } from '@/components/Admin/Restaurant/RestaurantManager/RestaurantManager'
import { Categories } from '@/components/Category/Categories/Categories'
import { CategoryBuilder } from '@/components/Category/CategoryBuilder/CategoryBuilder'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'
import { RestaurateurProfile } from '@/components/Restaurateur/RestaurateurProfile/RestaurateurProfile'

import { useGetData } from '@/hook/useGetData'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Burger, Group, AppShell, Box, RemoveScroll, Text, Stack, ScrollArea, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UseQueryResult } from '@tanstack/react-query'

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
          <RestaurateurProfile />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Header bg="#F4F4F4">
        <Group h="100%" mx="xs" justify="space-between">
          <Restaurants />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Main bg="#F4F4F4">{children}</AppShell.Main>
    </AppShell>
  )
}

export default RestaurantMenuLayout
