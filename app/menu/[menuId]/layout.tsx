'use client'

import { Item } from '@/components/Admin/Item/Item'
import { useGetData } from '@/hook/useGetData'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import {
  ActionIcon,
  AppShell,
  Box,
  Group,
  Indicator,
  Modal,
  RemoveScroll,
  ScrollArea,
  SimpleGrid,
  Text,
  rem,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useHeadroom } from '@/hook/useHeadroom'
import { UseQueryResult } from '@tanstack/react-query'

import { useState } from 'react'
import { UserItemModal } from '@/components/UserItems/UserItemModal/UserItemModal'

import { useMenuStore } from '@/store/Menu/Menu'

//Types
import { Item as ItemType } from '@/types/RestaurantMenu'
import { MenuCategories } from '@/components/MenuCategories/MenuCategories/MenuCategories'
import { Cart } from '@/components/Cart/Cart/Cart'
import { useShallow } from 'zustand/react/shallow'

import { MenuRestautant } from '@/components/MenuRestaurant/MenuRestaurant'
import { CartTitle } from '@/components/Cart/CartTitle/CartTitle'
import { CartTotal } from '@/components/Cart/CartTotal/CartTotal'

import { MenuCategoriesSticky } from '@/components/MenuCategories/MenuCategoriesSticky/MenuCategoriesSticky'
import { IconBasket, IconX } from '@tabler/icons-react'
import { Logotype } from '@/components/Logo/Logotype'

const MenuLayout = ({ children, params }: { children: React.ReactNode; params: { menuId: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData(
    'restaurant_user_menu',
    `restaurant_user_menu/${params.menuId}/`
  )
  const [opened, { toggle }] = useDisclosure()
  const [openedItem, { close: closeItem, open: openItem }] = useDisclosure()

  const [item, setItem] = useState<ItemType>()
  const [clearItems, items] = useMenuStore(useShallow((state) => [state.clearItems, state.items]))

  const pinned = useHeadroom({ fixedAt: 180 })

  const media = useMediaQuery('(max-width: 75em)')

  return (
    <AppShell
      bg="#FFF"
      padding={5}
      withBorder={false}
      header={{ height: 80, collapsed: media && !opened && !pinned }}
      navbar={{ width: 340, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      aside={{ width: 400, breakpoint: 'lg', collapsed: { desktop: false, mobile: true } }}
    >
      <AppShell.Header bg="#FFF">
        <Group h="100%" wrap="nowrap" justify="space-between" px="md">
          <Logotype order={2} />
          <div>
            {items.length ? (
              <Indicator color="dark" radius="xl" label={items.length} size={20} hiddenFrom="lg">
                <ActionIcon onClick={toggle} variant="transparent" color="dark" size={30}>
                  <IconBasket stroke={1} size={30} />
                </ActionIcon>
              </Indicator>
            ) : (
              <ActionIcon onClick={toggle} variant="transparent" color="dark" size={30} hiddenFrom="lg">
                <IconBasket stroke={1} size={30} />
              </ActionIcon>
            )}
          </div>
        </Group>
        <MenuCategoriesSticky restaurantMenu={data} />
      </AppShell.Header>

      <AppShell.Navbar p="sm" bg="#FFF">
        <AppShell.Section visibleFrom="lg">
          <Text fw={700} size="xl">
            Меню
          </Text>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea.Autosize} my="md" visibleFrom="lg">
          <MenuCategories data={data} />
        </AppShell.Section>

        <AppShell.Section hiddenFrom="lg">
          <CartTitle clearItems={clearItems} />
        </AppShell.Section>
        <AppShell.Section hiddenFrom="lg" h="100%">
          <Cart />
        </AppShell.Section>

        <AppShell.Section hiddenFrom="lg">
          <CartTotal items={items} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main pt={`calc(${rem(130)} + var(--mantine-spacing-md))`}>
        <MenuRestautant restaurant={data} />
        {data?.categories.map((category) => (
          <div key={category.id}>
            <Text fz={30} fw={700} my="md" id={category.id}>
              {category.name}
            </Text>

            <SimpleGrid
              spacing="5"
              w="100%"
              cols={{
                base: 2,
                xs: 2,
                sm: 3,
                md: 4,
                lg: 2,
                xl: 3,
              }}
            >
              {category.items.map((item) => (
                <Item
                  item={item}
                  key={item.id}
                  onActionClick={(item) => {
                    setItem(item)
                    openItem()
                  }}
                />
              ))}
            </SimpleGrid>
            {children}
          </div>
        ))}

        <Modal opened={openedItem} onClose={closeItem} size="md" scrollAreaComponent={ScrollArea.Autosize}>
          <UserItemModal item={item} />
        </Modal>
      </AppShell.Main>

      <AppShell.Aside bg="#FFF" p="xs" className={RemoveScroll.classNames.zeroRight}>
        <AppShell.Section>
          <CartTitle clearItems={clearItems} />
        </AppShell.Section>
        <AppShell.Section component={ScrollArea.Autosize} h="100%">
          <Cart />
        </AppShell.Section>
        <AppShell.Section my="md">
          <CartTotal items={items} />
        </AppShell.Section>
      </AppShell.Aside>
    </AppShell>
  )
}

export default MenuLayout
