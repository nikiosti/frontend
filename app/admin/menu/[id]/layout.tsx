'use client'

import { Categories } from '@/components/Category/Categories/Categories'
import { CategoryBuilder } from '@/components/Category/CategoryBuilder/CategoryBuilder'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'
import { RestaurateurProfile } from '@/components/Restaurateur/RestaurateurProfile/RestaurateurProfile'
import { Viewing } from '@/components/Viewing/Viewing'
import { useGetData } from '@/hook/useGetData'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Burger, Group, AppShell, Box, Image, Avatar, Text, Stack, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UseQueryResult } from '@tanstack/react-query'

const RestaurantMenuLayout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData('restaurant_menu', `restaurant_menu/${params.id}/`)

  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      withBorder={false}
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="xs"
    >
      <AppShell.Header bg="#F0F0F4">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Box visibleFrom="sm">
            <Restaurants />
          </Box>
          <RestaurateurProfile />
          <Viewing restaurantId={params.id} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="#F0F0F4">
        <Box hiddenFrom="sm" mb="lg">
          <Restaurants />
        </Box>

        <AppShell.Section>
          <Text fz={18} fw={500}>
            Категории
          </Text>
          <Text fz={14} c="gray">
            Всего {data?.categories.length}
          </Text>
        </AppShell.Section>

        <AppShell.Section grow my="md" component={ScrollArea}>
          <Categories menu={data} />
        </AppShell.Section>

        <AppShell.Section>
          <CategoryBuilder restaurantId={params.id} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main bg="#F0F0F4">{children}</AppShell.Main>
    </AppShell>
  )
}

export default RestaurantMenuLayout
