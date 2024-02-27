'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Box, Button, Paper, ScrollArea } from '@mantine/core'

import styles from './MenuCategoriesSticky.module.css'
export const MenuCategoriesSticky = ({ restaurantMenu }: { restaurantMenu: RestaurantMenu | undefined }) => {
  const scroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 150,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Box pb={10} bg="#F0F0F4" hiddenFrom="lg" className={styles.container}>
      <ScrollArea
        scrollbarSize={2}
        classNames={{
          root: styles.items,
        }}
      >
        {restaurantMenu?.categories.map((category, index) => (
          <Button
            size="md"
            className={styles.button}
            key={index}
            variant="white"
            color="dark"
            onClick={() => {
              if (category.id) scroll(category.id)
            }}
          >
            {category.name}
          </Button>
        ))}
      </ScrollArea>
    </Box>
  )
}
