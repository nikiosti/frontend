'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'
import { useGetData } from '@/hook/useGetData'
import { usePostData } from '@/hook/usePostData'
import { useForm } from '@mantine/form'
import { UseQueryResult } from '@tanstack/react-query'
import { ActionIcon, Avatar, Button, Group, Menu, Modal, Paper, Text, UnstyledButton } from '@mantine/core'
import { Restaurant, RestaurantListResponse } from '@/types/Restaurant'
import { RestaurantForm } from '../RestaurantForm/RestaurantForm'
import { IconSettings, IconX } from '@tabler/icons-react'
import { useDeleteData } from '@/hook/useDeleteData'
import { usePatchData } from '@/hook/usePatchData'

export const Restaurants = () => {
  const router = useRouter()
  const { data: restaurants }: UseQueryResult<RestaurantListResponse> = useGetData('restaurants', 'restaurants/')

  const form = useForm<Restaurant>({
    initialValues: {
      id: '',
      name: '',
      address: '',
      image: '',
      is_visible: true,
      wifi_password: '',
      working_hours: '',
    },
  })

  const pathname = usePathname()
  const restaurant = restaurants?.results.find((item) => pathname.includes(item.id || ''))
  const restaurantName = restaurant?.name || 'Заведения'
  const restaurantImage = restaurant?.image

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setFieldValue('image', acceptedFiles[0])
    }
  }

  const [openedRestaurant, { close: closeRestaurant, open: openRestaurant }] = useDisclosure(false)
  const [openedRestaurantChange, { close: closeRestaurantChange, open: openRestaurantChange }] = useDisclosure(false)

  const {
    mutate: postRestaurant,
    data: postRestaurantResponse,
    isSuccess: isSuccessPostRestaurant,
  } = usePostData(['restaurants'])

  useEffect(() => {
    if (isSuccessPostRestaurant) {
      router.push(`/admin/menu/${postRestaurantResponse.id}`)
    }
  }, [isSuccessPostRestaurant])

  const { mutate: deleteRestaurant } = useDeleteData(['restaurants'])
  const { mutate: usePatchRestaurant } = usePatchData(['restaurants'])

  const renderRestaurantMenuItem = (restaurant: Restaurant) => (
    <Menu.Item key={restaurant.id} content="123">
      <Link href={'/admin/menu/' + restaurant.id}>
        <Group>
          {restaurant.image && <Avatar src={restaurant.image as string} size={24} />}
          <Text maw={200}>{restaurant.name}</Text>
        </Group>
      </Link>
    </Menu.Item>
  )

  return (
    <>
      <Group>
        <Paper withBorder radius={12}>
          <Menu transitionProps={{ transition: 'scale-y', duration: 200 }} withArrow>
            <Group>
              <Menu.Target>
                <UnstyledButton>
                  <Paper radius={12} p="xs">
                    <Group wrap="nowrap">
                      {restaurantImage && (
                        <Avatar src={restaurantImage as string} alt="Изображение ресторана" size={24} />
                      )}
                      <Text> {restaurantName}</Text>
                    </Group>
                  </Paper>
                </UnstyledButton>
              </Menu.Target>
            </Group>
            <Menu.Dropdown maw={280}>
              {restaurants?.results.map(renderRestaurantMenuItem)}
              <Menu.Item color="green" ta="center" onClick={openRestaurant}>
                <Text>Новое заведение</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Paper>

        {restaurant && (
          <UnstyledButton
            onClick={() => {
              for (const [fieldName, value] of Object.entries(restaurant)) {
                form.setFieldValue(fieldName, value !== null ? value : '')
              }
              openRestaurantChange()
            }}
          >
            <Group gap="0.3rem">
              <IconSettings stroke={1.5} size={20} />
              Правки
            </Group>
          </UnstyledButton>
        )}
      </Group>
      <Modal
        opened={openedRestaurant}
        onClose={closeRestaurant}
        title={
          <Text fw={700} fz="xl">
            Новое заведение
          </Text>
        }
        size="xl"
      >
        <RestaurantForm
          form={form}
          formSubmit={() => {
            postRestaurant({
              key: 'restaurants/',
              datas: form.values,
            })

            closeRestaurant()
            form.reset()
          }}
          handleDrop={handleDrop}
        >
          <Button type="submit">Сохранить</Button>
        </RestaurantForm>
      </Modal>
      <Modal
        opened={openedRestaurantChange}
        onClose={closeRestaurantChange}
        title={
          <Text fw={700} fz="xl">
            Правки заведения
          </Text>
        }
        size="xl"
      >
        <RestaurantForm form={form} formSubmit={() => {}} handleDrop={handleDrop}>
          <Button
            fullWidth
            color="red"
            variant="light"
            onClick={() => {
              deleteRestaurant(`restaurants/${form.values.id}/`)
              closeRestaurantChange()
              form.reset()
              router.push('/admin/')
            }}
          >
            Удалить
          </Button>
          <Button
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
        </RestaurantForm>
      </Modal>
    </>
  )
}
