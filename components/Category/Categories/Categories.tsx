'use client'

import { useDeleteData } from '@/hook/useDeleteData'
import { usePatchData } from '@/hook/usePatchData'
import { CategoryItem } from '@/types/Category'
import { RestaurantMenu } from '@/types/RestaurantMenu'
import { Box, Button, Group, Modal, Paper, Text, UnstyledButton } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { CategoryForm } from '@/components/Category/CategoryForm/CategoryForm'
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react'

const CategoryCard = ({
  category,
  onOpenCategoryModal,
}: {
  category: CategoryItem
  onOpenCategoryModal: (form: CategoryItem) => void
}) => {
  return (
    <UnstyledButton onClick={() => onOpenCategoryModal(category)} w="100%">
      <Paper my="xs" px="xs" radius={12} withBorder>
        <Group mih={66}>
          <Text>{category.name}</Text>
        </Group>
      </Paper>
    </UnstyledButton>
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

  // useEffect(() => form.setFieldValue('restaurant_ref', menu?.id || ''), [menu])

  const onOpenCategoryModal = (category: CategoryItem) => {
    form.setValues(category)
    openCategory()
  }

  const { mutate: patchCategory } = usePatchData(['restaurant_menu'])
  const { mutate: deleteCategory } = useDeleteData(['restaurant_menu'])
  return (
    <>
      {menu?.categories.map((category) => (
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
          <Button
            color="red"
            onClick={() => {
              deleteCategory(`category/${form.values.id}/`)
              closeCategory()
            }}
            variant="light"
          >
            <Box hiddenFrom="xs">
              <IconTrash stroke={1.5} />
            </Box>
            <Text visibleFrom="xs" fz={20}>
              Удалить
            </Text>
          </Button>
          <Button type="submit">
            <Box hiddenFrom="xs">
              <IconDeviceFloppy stroke={1.5} />
            </Box>
            <Text visibleFrom="xs" fz={20}>
              Сохранить
            </Text>
          </Button>
        </CategoryForm>
      </Modal>
    </>
  )
}
