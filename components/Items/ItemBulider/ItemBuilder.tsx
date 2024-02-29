'use client'

//Hooks
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { usePostData } from '@/hook/usePostData'

//Components
import { Button, Center, Modal, Stack, Text } from '@mantine/core'
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

  const mutation = usePostData(['restaurant_menu'])

  const handleItemToFormData = (datas: Item, formData: FormData): FormData => {
    for (let value of Object.entries(datas)) {
      if (value[1]) {
        if (value[1] instanceof Array) {
          value[1].map((el, index) => {
            for (let item of Object.entries(el)) {
              formData.append(`${value[0]}[${index}]${item[0]}`, item[1])
            }
          })
        } else {
          formData.append(value[0], value[1])
        }
      }
    }

    return formData
  }

  return (
    <>
      <Button onClick={open} className={styles.card}>
        <Center>
          <Stack align="center">
            <IconPlus stroke={1} size={50} color="#000000" />
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
          <Text fw={700} fz={20}>
            Новая позиция
          </Text>
        }
        size="xl"
      >
        <ItemForm
          form={form}
          formSubmit={() => {
            const formData = new FormData()
            const datas = handleItemToFormData(form.values, formData)

            mutation.mutate({
              key: 'menu_item/',
              datas,
            })
            form.reset()
            close()
          }}
        >
          <Button type="submit" mt="xs" fullWidth>
            Сохранить
          </Button>
        </ItemForm>
      </Modal>
    </>
  )
}
