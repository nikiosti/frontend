'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'
import { useGetData } from '@/hook/useGetData'
import { useForm } from '@mantine/form'
import { UseQueryResult } from '@tanstack/react-query'
import { Avatar, Button, Container, Group, Modal, Popover, ScrollArea, Text, UnstyledButton } from '@mantine/core'
import { Restaurant, RestaurantListResponse } from '@/types/Restaurant'
import { RestaurantForm } from '@/components/Admin/Forms/RestaurantForm/RestaurantForm'
import { useDeleteData } from '@/hook/useDeleteData'
import { usePatchData } from '@/hook/usePatchData'
import { IconTrash } from '@tabler/icons-react'

export const RestaurantManager = () => {
  const router = useRouter()
  const { data: restaurants }: UseQueryResult<RestaurantListResponse> = useGetData('restaurants', 'restaurants/')

  const form = useForm<Restaurant>({
    initialValues: {
      id: '',
      name: '',
      address: '',
      image: null,
      image_url: '',
      is_visible: true,
      wifi_password: '',
      working_hours: '',
    },
  })

  const pathname = usePathname()

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setFieldValue('image', acceptedFiles[0])
    }
  }

  const [openedRestaurantChange, { close: closeRestaurantChange, open: openRestaurantChange }] = useDisclosure(false)

  //PATCH_RESTAURANT_ACTION
  const { mutate: usePatchRestaurant } = usePatchData(['restaurants'])
  const handlePatchRestaurant = () => {
    const formData = new FormData()
    const data = form.values

    //FILLING FORMDATA
    Object.entries(data).forEach(([key, value]) => {
      //CHECKING IMAGE PER FILE
      if (key === 'image' && typeof value === 'string') return
      formData.append(key, value as string)
    })

    usePatchRestaurant({
      key: `restaurants/${form.values.id}/`,
      datas: formData,
    })

    closeRestaurantChange()
    form.reset()
  }

  //DELETE_RESTAURANT_ACTION
  const { mutate: deleteRestaurant } = useDeleteData(['restaurants'])
  const handleDeleteRestaurant = () => {
    deleteRestaurant(`restaurants/${form.values.id}/`)
    closeRestaurantChange()
    form.reset()
    router.push('/admin/')
  }

  const restaurant = restaurants?.results.find((item) => pathname.includes(item.id))
  const handleEditRestaurant = () => {
    if (!restaurant) return

    Object.keys(form.values).forEach((key) => {
      const restaurantKey = key as keyof Restaurant
      form.setFieldValue(key, restaurant[restaurantKey] || form.values[restaurantKey])
    })
  }
  return (
    <>
      <UnstyledButton
        onClick={() => {
          handleEditRestaurant()
          openRestaurantChange()
        }}
      >
        <Group wrap="nowrap" gap="0.5rem">
          <Avatar src={restaurant?.image_url} size={45} />
          <div>
            <Text fz="md" fw={500} lineClamp={1} c="dark">
              {restaurant?.name}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} lineClamp={1}>
              {restaurant?.address}
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <Modal
        scrollAreaComponent={ScrollArea.Autosize}
        opened={openedRestaurantChange}
        onClose={() => {
          form.reset()
          closeRestaurantChange()
        }}
        title={
          <Text fw={600} fz="xl">
            Правки заведения
          </Text>
        }
        size="lg"
      >
        <RestaurantForm form={form} formSubmit={handlePatchRestaurant} handleDrop={handleDrop}>
          <Button fullWidth onClick={handlePatchRestaurant}>
            Сохранить
          </Button>

          <Container>
            <Popover withArrow withRoles>
              <Popover.Target>
                <Button
                  variant="subtle"
                  color="red"
                  // onClick={handleDeleteRestaurant}
                  rightSection={<IconTrash stroke={1.5} />}
                >
                  Удалить
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text fw={500}>Удалить {restaurant?.name}?</Text>

                <Button size="sm" mt="xs" onClick={handleDeleteRestaurant}>
                  Да
                </Button>
              </Popover.Dropdown>
            </Popover>
          </Container>
        </RestaurantForm>
      </Modal>
    </>
  )
}
