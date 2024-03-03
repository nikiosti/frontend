'use client'

//Hooks
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { usePostData } from '@/hook/usePostData'

//Components
import { Button, Center, Checkbox, Group, Modal, Stack, Text } from '@mantine/core'
import { ItemForm } from '../ItemForm/ItemForm'

//Styles
import styles from './ItemBuilder.module.css'
import { IconPlus } from '@tabler/icons-react'
import { Item } from '@/types/RestaurantMenu'

export const ItemBuilder = ({ category_ref }: { category_ref: string }) => {
  const [opened, { close, open }] = useDisclosure(false)

  const form = useForm<Item>({
    initialValues: {
      id: '',
      name: '',
      image: null,
      image_url: '',

      stop_list: false,
      cooking_time: '',

      description: '',
      category_ref,
      prices: [],
    },
  })

  const { mutate: postMenuItem } = usePostData(['restaurant_menu'])
  const handlePostMenuItem = () => {
    const formData = new FormData()

    Object.entries(form.values).forEach(([key, value]) => {
      if (value) {
        if (value instanceof Array) {
          value.map((element, index) => {
            Object.entries(element).forEach(([nested_key, nested_value]) =>
              formData.append(`${key}[${index}]${nested_key}`, nested_value as string)
            )
          })
        } else if (key === 'image' && typeof value === 'string') return
        else {
          formData.append(key, value as string)
        }
      }
    })

    postMenuItem({
      key: 'menu_item/',
      datas: formData,
    })
    form.reset()
    close()
  }

  return (
    <>
      <Button onClick={open} className={styles.card}>
        <Center>
          <Stack align="center">
            <IconPlus stroke={1} size={50} color="#000" />
            <Text fz={20} fw={500} c="dark">
              Новая позиция
            </Text>
          </Stack>
        </Center>
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group align="center">
            <Text fw={700}>Новая позиция</Text>
          </Group>
        }
        size="xl"
      >
        <ItemForm form={form} formSubmit={handlePostMenuItem}>
          <Button type="submit" mt="xs" fullWidth>
            Сохранить
          </Button>
        </ItemForm>
      </Modal>
    </>
  )
}
