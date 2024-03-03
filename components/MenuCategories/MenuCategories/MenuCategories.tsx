'use client'

import { CategoryItem } from '@/types/Category'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Paper, Text } from '@mantine/core'

import styles from './MenuCategories.module.css'

const MenuCategoryCard = ({ category }: { category: CategoryItem }) => {
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
    <Paper
      className={styles.item}
      my="xs"
      p="xs"
      radius={12}
      key={category.id}
      onClick={() => {
        if (category.id) scroll(category.id)
      }}
    >
      <Text fw={500} fz="xl">
        {category.name}
      </Text>
    </Paper>
  )
}

export const MenuCategories = ({ data }: { data: RestaurantMenu | undefined }) => {
  return (
    <>
      {data?.categories.map((category) => (
        <MenuCategoryCard key={category.id} category={category} />
      ))}
    </>
  )
}
