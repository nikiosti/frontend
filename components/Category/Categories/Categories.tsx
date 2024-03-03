'use client'

import { useDeleteData } from '@/hook/useDeleteData'
import { usePatchData } from '@/hook/usePatchData'
import { CategoryItem } from '@/types/Category'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Button, Container, Modal, Paper, Text, UnstyledButton } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { CategoryForm } from '@/components/Category/CategoryForm/CategoryForm'

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
  const handlePatchCategory = () => {
    const formData = new FormData()
    Object.entries(form.values).forEach(([key, value]) => formData.append(key, value))
    patchCategory({ key: `category/${form.values.id}/`, datas: formData })
    closeCategory()
  }

  const { mutate: deleteCategory } = useDeleteData(['restaurant_menu'])
  const handleDeleteCategory = () => {
    deleteCategory(`category/${form.values.id}/`)
    closeCategory()
  }
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
        <CategoryForm form={form} formSubmit={handlePatchCategory}>
          <Button type="submit" radius="xl" fullWidth>
            Сохранить
          </Button>
          <Container>
            <UnstyledButton mt="xs" onClick={handleDeleteCategory}>
              <Text c="dimmed">Удалить</Text>
            </UnstyledButton>
          </Container>
        </CategoryForm>
      </Modal>
    </>
  )
}
