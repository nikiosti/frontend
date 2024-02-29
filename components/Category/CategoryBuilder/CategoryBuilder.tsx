'use client'

import { usePostData } from '@/hook/usePostData'
import { CategoryForm } from '../CategoryForm/CategoryForm'
import { Button, Center, Container, Modal, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CategoryItem } from '@/types/Category'
import { useDisclosure } from '@mantine/hooks'
export const CategoryBuilder = ({ restaurantId }: { restaurantId: string }) => {
  const [openedCategory, { close: closeCategory, open: openCategory }] = useDisclosure(false)

  const form = useForm<CategoryItem>({
    initialValues: {
      name: '',
      restaurant_ref: restaurantId,
    },
  })

  const { mutate: postCategory } = usePostData(['restaurant_menu'])

  return (
    <>
      <Button onClick={openCategory} bg="violet.4" fullWidth size="md" radius="xl">
        Новая категория
      </Button>

      <Modal
        opened={openedCategory}
        onClose={closeCategory}
        title={
          <Text fw={700} fz="xl">
            Новая категория
          </Text>
        }
      >
        <CategoryForm
          form={form}
          formSubmit={() => {
            postCategory({
              datas: form.values,
              key: 'category/',
            })

            closeCategory()
            form.reset()
          }}
        >
          <Button type="submit" radius="xl" fullWidth >
            Сохранить
          </Button>
        </CategoryForm>
      </Modal>
    </>
  )
}
