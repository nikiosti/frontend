'use client'

import { Item } from '@/components/Items/Item/Item'
import { useGetData } from '@/hook/useGetData'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import {
  AppShell,
  Box,
  Burger,
  Container,
  Group,
  Image,
  Indicator,
  Modal,
  RemoveScroll,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UseQueryResult } from '@tanstack/react-query'

import { useState } from 'react'
import { UserItemModal } from '@/components/UserItems/UserItemModal/UserItemModal'

import { useMenuStore } from '@/store/Menu/Menu'

//Types
import { Item as ItemType } from '@/types/RestaurantMenu'
import { MenuCategories } from '@/components/MenuCategories/MenuCategories/MenuCategories'
import { Cart } from '@/components/Cart/Cart/Cart'
import { useShallow } from 'zustand/react/shallow'

import styles from './layout.module.css'
import { MenuRestautant } from '@/components/MenuRestaurant/MenuRestaurant'
import { CartTitle } from '@/components/Cart/CartTitle/CartTitle'
import { CartTotal } from '@/components/Cart/CartTotal/CartTotal'

import { MenuCategoriesSticky } from '@/components/MenuCategories/MenuCategoriesSticky/MenuCategoriesSticky'
import { IconSearch } from '@tabler/icons-react'

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
      bg="#F0F0F4"
      withBorder={false}
      header={{ height: 80 }}
      padding="xs"
      navbar={{ width: 300, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      aside={{ width: 400, breakpoint: 'lg', collapsed: { desktop: false, mobile: true } }}
    >
      <AppShell.Header bg="#F0F0F4" className={styles.header} p="xs">
        <Group h="100%" wrap="nowrap" preventGrowOverflow={false} w="100%" justify="space-between" pr="xs">
          <Group wrap="nowrap" preventGrowOverflow={false}>
            <Image src="/logotype.svg" w={55} />
            <div>
              <h2>Едадед</h2>
              <Text c="dimmed" size="sm">
                Электронное меню
              </Text>
            </div>
          </Group>
          {items.length ? (
            <Indicator color="dark" radius="xl" label={items.length} size={20} hiddenFrom="lg">
              <Burger onClick={toggle} opened={opened} />
            </Indicator>
          ) : (
            <Burger hiddenFrom="lg" onClick={toggle} opened={opened} />
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm" bg="#F0F0F4">
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
      <AppShell.Main>
        <MenuRestautant restaurant={data} />
        <MenuCategoriesSticky restaurantMenu={data} />

        {children}
        <Box>
          {data?.categories.map((category) => (
            <div key={category.id}>
              <Text fz={22} fw={700} my="md" id={category.id}>
                {category.name}
              </Text>

              <SimpleGrid
                w="100%"
                cols={{
                  base: 1,
                  xs: 2,
                  sm: 3,
                  md: 3,
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

      <AppShell.Aside bg="#F0F0F4" p="xs" className={RemoveScroll.classNames.zeroRight}>
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
