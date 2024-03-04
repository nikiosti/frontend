'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { AppShell, Box, Modal, RemoveScroll, ScrollArea, SimpleGrid, Text, UnstyledButton, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useGetData } from '@/hook/useGetData'

import { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

import { useMenuStore } from '@/store/Menu/Menu'
import { useShallow } from 'zustand/react/shallow'

//Types
import { Item as ItemType } from '@/types/RestaurantMenu'

import { Item } from '@/components/General'

import {
  CategoriesSticky,
  Categories,
  Cart,
  CartTitle,
  CartTotal,
  Restautant,
  ItemModal,
  Burger,
} from '@/components/Menu'

const MenuLayout = ({ children, params }: { children: React.ReactNode; params: { menuId: string } }) => {
  const { data }: UseQueryResult<RestaurantMenu> = useGetData(
    'restaurant_user_menu',
    `restaurant_user_menu/${params.menuId}/`
  )
  const [opened, { toggle }] = useDisclosure()
  const [openedItem, { close: closeItem, open: openItem }] = useDisclosure()

  const [item, setItem] = useState<ItemType>()
  const [clearItems, items] = useMenuStore(useShallow((state) => [state.clearItems, state.items]))

  return (
    <AppShell
      bg="#FFF"
      padding={5}
      withBorder={false}
      navbar={{ width: 340, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      aside={{ width: 400, breakpoint: 'lg', collapsed: { desktop: false, mobile: true } }}
    >
      <AppShell.Navbar p="sm" bg="#FFF" pt={60} zIndex={99}>
        <AppShell.Section visibleFrom="lg">
          <Text fw={700} size="xl">
            Меню
          </Text>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea} my="md" visibleFrom="lg">
          <Categories data={data} />
        </AppShell.Section>

        <AppShell.Section hiddenFrom="lg">
          <CartTitle clearItems={clearItems} />
        </AppShell.Section>
        <AppShell.Section hiddenFrom="lg" h="100%" component={ScrollArea} grow>
          <Cart />
        </AppShell.Section>

        <AppShell.Section hiddenFrom="lg">
          <CartTotal items={items} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Burger items={items} opened={opened} toggle={toggle} />
        <Restautant restaurant={data} />
        <CategoriesSticky restaurantMenu={data} />
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
          <ItemModal item={item} />
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
