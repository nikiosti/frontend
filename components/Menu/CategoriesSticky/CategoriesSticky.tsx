'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Box, Button, ScrollArea } from '@mantine/core'

import styles from './CategoriesSticky.module.css'

export const CategoriesSticky = ({ restaurantMenu }: { restaurantMenu: RestaurantMenu | undefined }) => {
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
    <Box p="xs" bg="#FFF" hiddenFrom="lg" style={{ position: 'sticky', top: -1, zIndex: 2 }}>
      <ScrollArea
        offsetScrollbars="x"
        scrollbarSize={2}
        classNames={{
          root: styles.items,
        }}
      >
        {restaurantMenu?.categories.map((category, index) => (
          <Button
            radius="xl"
            variant="filled"
            size="md"
            className={styles.button}
            key={index}
            color="#F4F4F4"
            autoContrast
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
