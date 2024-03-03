'use client'

import { ActionIcon, Avatar, Button, Modal, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { RestaurantForm } from '../../Forms/RestaurantForm/RestaurantForm'

import { UseFormReturnType } from '@mantine/form'
import { Restaurant } from '@/types/Restaurant'

import { IconPlus } from '@tabler/icons-react'

export const RestaurantBuilder = ({
  form,
  formSubmit,
  handleDrop,
}: {
  form: UseFormReturnType<Restaurant>
  formSubmit: () => void
  handleDrop: (acceptedFiles: File[]) => void
}) => {
  const [openedRestaurant, { close: closeRestaurant, open: openRestaurant }] = useDisclosure(false)

  return (
    <>
      <Tooltip withArrow label="Новое заведение">
        <Avatar variant="transparent" size={45}>
          <ActionIcon size="xl" variant="transparent" radius="xl" onClick={openRestaurant}>
            <IconPlus stroke={1.5} color="#000" size={45} />
          </ActionIcon>
        </Avatar>
      </Tooltip>

      <Modal
        opened={openedRestaurant}
        onClose={closeRestaurant}
        title={
          <Text fw={700} fz="xl">
            Новое заведение
          </Text>
        }
        size="lg"
      >
        <RestaurantForm form={form} formSubmit={formSubmit} handleDrop={handleDrop}>
          <Button type="submit" fullWidth radius="xl">
            Сохранить
          </Button>
        </RestaurantForm>
      </Modal>
    </>
  )
}
