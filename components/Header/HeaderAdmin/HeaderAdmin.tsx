'use client'

import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'
import { RestaurateurProfile } from '@/components/Restaurateur/RestaurateurProfile/RestaurateurProfile'
import { Box, Burger, Drawer, Group } from '@mantine/core'

import styles from './HeaderAdmin.module.css'
import { Categories } from '@/components/Category/Categories/Categories'
import { CategoryBuilder } from '@/components/Category/CategoryBuilder/CategoryBuilder'
import { useDisclosure } from '@mantine/hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { useGetData } from '@/hook/useGetData'

export const HeaderAdmin = ({ restaurantId }: { restaurantId: string }) => {
  const [openedBurger, { toggle: toggleBurger, close: closeBurger }] = useDisclosure(false)
  const { data }: UseQueryResult<RestaurantMenu> = useGetData('restaurant_menu', `restaurant_menu/${restaurantId}/`)

  return (
    <>
      <Group className={styles.header}>
        <Restaurants />
        <RestaurateurProfile />

        <Burger
          hiddenFrom="xs"
          opened={openedBurger}
          onClick={toggleBurger}
          pos="fixed"
          top={10}
          right={10}
          style={{ zIndex: 10 }}
        />

        <Drawer onClose={closeBurger} hiddenFrom="xs" opened={openedBurger}>
          <Box hiddenFrom="xs">
            <Restaurants />
            <Categories menu={data} />
            <CategoryBuilder restaurantId={restaurantId} />
          </Box>
        </Drawer>
      </Group>
    </>
  )
}
