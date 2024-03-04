'use client'

import { Box, Burger as BurgerButton, Indicator } from '@mantine/core'

import { GroupedItem } from '@/store/Menu/Menu'

export const Burger = ({ items, toggle, opened }: { items: GroupedItem[]; toggle: () => void; opened: boolean }) => {
  return (
    <>
      <Box
        hiddenFrom="lg"
        style={{
          zIndex: 100,
          position: 'fixed',
          right: 12,
          top: 10,
          borderRadius: '100px',
          backgroundColor: '#F4F4F4',
          width: 40,
          height: 40,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Indicator label={items.length} disabled={!items.length} color="dark" size={20} radius="xl">
          <BurgerButton variant="filled" onClick={toggle} opened={opened} />
        </Indicator>
      </Box>
    </>
  )
}
