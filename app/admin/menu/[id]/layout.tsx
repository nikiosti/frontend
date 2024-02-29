'use client'

import { Categories } from '@/components/Category/Categories/Categories'
import { CategoryBuilder } from '@/components/Category/CategoryBuilder/CategoryBuilder'
import { RestaurantAction } from '@/components/Restaurants/RestaurantAction/RestaurantAction'
import { RestaurateurProfile } from '@/components/Restaurateur/RestaurateurProfile/RestaurateurProfile'
import { Viewing } from '@/components/Viewing/Viewing'
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
      padding="xs"
      withBorder={false}
    >
      <AppShell.Navbar py="md" px="xs">
        <AppShell.Section>
          <Group wrap="nowrap" justify="space-between">
            <RestaurantAction />
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
      <AppShell.Main bg="#F4F4F4" >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          style={{ position: 'absolute', zIndex: 2, right: 10, top: 20 }}
        />
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default RestaurantMenuLayout
