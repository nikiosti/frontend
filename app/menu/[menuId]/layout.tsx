'use client'

import { Item } from '@/components/Items/Item/Item'
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
import { useDisclosure, useHeadroom, useMediaQuery } from '@mantine/hooks'
import { UseQueryResult, useQueries } from '@tanstack/react-query'

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

const MenuLayout = ({ children, params }: { children: React.ReactNode; params: { menuId: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData(
    'restaurant_user_menu',
    `restaurant_user_menu/${params.menuId}/`
  )
  const [opened, { toggle }] = useDisclosure()
  const [openedItem, { close: closeItem, open: openItem }] = useDisclosure()

  const [item, setItem] = useState<ItemType>()
  const [clearItems, items] = useMenuStore(useShallow((state) => [state.clearItems, state.items]))

  const pinned = useHeadroom({ fixedAt: 160 })
  const matches = useMediaQuery('(min-width: 74em)')

  return (
    <AppShell
      bg="#F4F4F4"
      padding={5}
      withBorder={false}
      header={{ height: 80, collapsed: !pinned, offset: false }}
      navbar={{ width: 340, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      aside={{ width: 400, breakpoint: 'lg', collapsed: { desktop: false, mobile: true } }}
    >
      {!matches && (
        <AppShell.Header bg="#FFFFFF">
          <Group h="100%" wrap="nowrap" preventGrowOverflow={false} w="100%" justify="space-between" p="xs">
            <div>
              <h2>Едадед</h2>
              <Text c="dimmed" size="sm">
                Электронное меню
              </Text>
            </div>

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
          </Group>
          <MenuCategoriesSticky restaurantMenu={data} />
        </AppShell.Header>
      )}

      <AppShell.Navbar p="sm" bg="#F4F4F4">
        <AppShell.Section pb="xl" pt="sm" hiddenFrom="lg">
          <ActionIcon
            onClick={toggle}
            variant="transparent"
            color="dark"
            size={30}
            hiddenFrom="lg"
            pos="absolute"
            right={10}
          >
            <IconX stroke={1} size={30} />
          </ActionIcon>
        </AppShell.Section>

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

      <AppShell.Main pt={!matches ? `calc(${rem(80)} + var(--mantine-spacing-md))` : 'xs'}>
        <MenuRestautant restaurant={data} />

        {children}
        <Box>
          {data?.categories.map((category) => (
            <div key={category.id}>
              <Text fz="xl" fw={700} my="md" id={category.id}>
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
            </div>
          ))}
        </Box>
        <Modal opened={openedItem} onClose={closeItem} size="md" scrollAreaComponent={ScrollArea.Autosize}>
          <UserItemModal item={item} />
        </Modal>
      </AppShell.Main>

      <AppShell.Aside bg="#F4F4F4" p="xs" className={RemoveScroll.classNames.zeroRight}>
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
