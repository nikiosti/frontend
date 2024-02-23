'use client'

import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Box, Button, ScrollArea } from '@mantine/core'
import { UseQueryResult } from '@tanstack/react-query'

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
    <Box pb={10} bg="#F0F0F4" hiddenFrom="lg" style={{ position: 'sticky', top: 79, zIndex: 2 }}>
      <ScrollArea style={{ whiteSpace: 'nowrap' }}>
        {restaurantMenu?.categories.map((category, index) => (
          <Button
            key={index}
            mr="xs"
            size="md"
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
