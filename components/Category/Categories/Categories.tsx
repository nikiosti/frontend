'use client'

import { useDeleteData } from '@/hook/useDeleteData'
import { usePatchData } from '@/hook/usePatchData'
import { CategoryItem } from '@/types/Category'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Box, Button, Container, Modal, Paper, Text, UnstyledButton } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { CategoryForm } from '@/components/Category/CategoryForm/CategoryForm'
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react'

import styles from './Categories.module.css'

const CategoryCard = ({
  category,
  onOpenCategoryModal,
}: {
  category: CategoryItem
  onOpenCategoryModal: (form: CategoryItem) => void
}) => {
  return (
    <Paper p="xs" my="xs" radius={12} className={styles.card}>
      <UnstyledButton my={0} onClick={() => onOpenCategoryModal(category)} w="100%">
        <Text fw={500} fz="16">
          {category.name}
        </Text>
      </UnstyledButton>
    </Paper>
  )
}

export const Categories = ({ menu }: { menu: RestaurantMenu | undefined }) => {
  const [openedCategory, { close: closeCategory, open: openCategory }] = useDisclosure(false)

  const form = useForm<CategoryItem>({
    initialValues: {
      id: '',
      name: '',
      restaurant_ref: '',
    },
  })

  const onOpenCategoryModal = (category: CategoryItem) => {
    form.setValues(category)
    openCategory()
  }

  const { mutate: patchCategory } = usePatchData(['restaurant_menu'])
  const { mutate: deleteCategory } = useDeleteData(['restaurant_menu'])

  return (
    <>
      {menu?.categories?.map((category) => (
        <CategoryCard category={category} onOpenCategoryModal={onOpenCategoryModal} key={category.id} />
      ))}

      <Modal
        opened={openedCategory}
        onClose={closeCategory}
        title={
          <Text fw={700} fz="xl">
            Правки категории
          </Text>
        }
      >
        <CategoryForm
          form={form}
          formSubmit={() => {
            patchCategory({ key: `category/${form.values.id}/`, datas: form.values })
            closeCategory()
          }}
        >
          <Button type="submit" radius="xl" fullWidth>
            Сохранить
          </Button>
          <Container>
            <UnstyledButton
              mt="xs"
              onClick={() => {
                deleteCategory(`category/${form.values.id}/`)
                closeCategory()
              }}
            >
              <Text c="dimmed">Удалить</Text>
            </UnstyledButton>
          </Container>
        </CategoryForm>
      </Modal>
    </>
  )
}
