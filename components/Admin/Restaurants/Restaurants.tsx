'use client'

import { useGetData } from '@/hook/useGetData'
import { Restaurant, RestaurantListResponse } from '@/types/Restaurant'
import { ActionIcon, Avatar, Button, Group, Modal, Text, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { UseQueryResult } from '@tanstack/react-query'
import Link from 'next/link'
import { RestaurantForm } from '../Forms/RestaurantForm/RestaurantForm'
import { usePostData } from '@/hook/usePostData'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './Restaurants.module.css'
import { RestaurantBuilder } from '../Builder/RestaurantBuilder/RestaurantBuilder'

export const Restaurants = () => {
  const { data: restaurants }: UseQueryResult<RestaurantListResponse> = useGetData('restaurants', 'restaurants/')
  const [openedRestaurant, { close: closeRestaurant, open: openRestaurant }] = useDisclosure(false)

  const router = useRouter()

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
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setFieldValue('image', acceptedFiles[0])
    }
  }

  const {
    mutate: postRestaurant,
    data: postRestaurantResponse,
    isSuccess: isSuccessPostRestaurant,
  } = usePostData(['restaurants'])

  const handlePostRestaurant = () => {
    const formData = new FormData()
    Object.entries(form.values).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    postRestaurant({
      key: 'restaurants/',
      datas: formData,
    })

    closeRestaurant()
    form.reset()
  }

  useEffect(() => {
    if (isSuccessPostRestaurant) {
      router.push(`/admin/menu-management/${postRestaurantResponse.id}`)
    }
  }, [isSuccessPostRestaurant])

  return (
    <>
      <Avatar.Group>
        {restaurants?.results.map((restaurant) => (
          <Link href={'/admin/menu-management/' + restaurant.id} key={restaurant.id}>
            <Tooltip label={restaurant.name} withArrow>
              <Avatar src={restaurant.image_url} size={45} className={styles.avatar} variant="filled">
                {restaurant.image_url ? (
                  <Text fw={500}>{restaurant.name}</Text>
                ) : (
                  <Text fw={500}>{restaurant.name.substring(0, 3)}</Text>
                )}
              </Avatar>
            </Tooltip>
          </Link>
        ))}

        <RestaurantBuilder form={form} formSubmit={handlePostRestaurant} handleDrop={handleDrop} />
      </Avatar.Group>
    </>
  )
}
