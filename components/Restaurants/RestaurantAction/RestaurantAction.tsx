'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'
import { useGetData } from '@/hook/useGetData'
import { usePostData } from '@/hook/usePostData'
import { useForm } from '@mantine/form'
import { UseQueryResult } from '@tanstack/react-query'
import { Avatar, Button, Container, Group, Modal, Text, UnstyledButton } from '@mantine/core'
import { Restaurant, RestaurantListResponse } from '@/types/Restaurant'
import { RestaurantForm } from '../RestaurantForm/RestaurantForm'
import { useDeleteData } from '@/hook/useDeleteData'
import { usePatchData } from '@/hook/usePatchData'

export const RestaurantAction = () => {
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
  const restaurant = restaurants?.results.find((item) => pathname.includes(item.id || ''))
  const restaurantName = restaurant?.name || 'Заведения'
  const restaurantImage = restaurant?.image_url
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setFieldValue('image', acceptedFiles[0])
    }
  }

  const [openedRestaurantChange, { close: closeRestaurantChange, open: openRestaurantChange }] = useDisclosure(false)

  const { mutate: deleteRestaurant } = useDeleteData(['restaurants'])
  const { mutate: usePatchRestaurant } = usePatchData(['restaurants'])

  return (
    <>
      <UnstyledButton
        onClick={() => {
          for (const [fieldName, value] of Object.entries(restaurant)) {
            form.setFieldValue(fieldName, value !== null ? value : '')
          }
          openRestaurantChange()
        }}
      >
        <Group wrap="nowrap" gap="0.5rem">
          <Avatar src={restaurantImage} size={45}></Avatar>
          <Text fz="md" fw={500} lineClamp={2} c="dark" td="underline">
            {restaurantName}
          </Text>
        </Group>
      </UnstyledButton>

      <Modal
        opened={openedRestaurantChange}
        onClose={() => {
          closeRestaurantChange()
          form.reset()
        }}
        title={
          <Text fw={700} fz="xl">
            Правки заведения
          </Text>
        }
        size="lg"
      >
        <RestaurantForm form={form} formSubmit={() => {}} handleDrop={handleDrop}>
          <Button
            radius="xl"
            fullWidth
            onClick={() => {
              usePatchRestaurant({
                key: `restaurants/${form.values.id}/`,
                datas: form.values,
              })

              closeRestaurantChange()
              form.reset()
            }}
          >
            Сохранить
          </Button>

          <Container>
            <UnstyledButton
              mt="xs"
              onClick={() => {
                deleteRestaurant(`restaurants/${form.values.id}/`)
                closeRestaurantChange()
                form.reset()
                router.push('/admin/')
              }}
            >
              <Text c="dimmed">Удалить</Text>
            </UnstyledButton>
          </Container>
        </RestaurantForm>
      </Modal>
    </>
  )
}
