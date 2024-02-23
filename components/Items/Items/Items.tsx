'use client'

//Components
import { Item } from '../Item/Item'
import { Box, Button, Grid, Group, Modal, ScrollArea, SimpleGrid, Text } from '@mantine/core'
import { ItemBuilder } from '../ItemBulider/ItemBuilder'
import { Item as ItemType, RestaurantMenu } from '@/types/RestaurantMenu'

//Hooks
import { usePatchData } from '@/hook/usePatchData'
import { useDeleteData } from '@/hook/useDeleteData'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
//Types
import { ItemFormValue } from '@/types/Item'
import { ItemForm } from '../ItemForm/ItemForm'
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react'

export const Items = ({ data }: { data: RestaurantMenu | undefined }) => {
  const { mutate: deleteItem } = useDeleteData(['restaurant_menu'])
  const [opened, { close, open }] = useDisclosure(false)

  const form = useForm<ItemType>({
    initialValues: {
      prices: [],
      id: '',
      name: '',
      image: '',
      price: 0,
      description: '',
      weight_in_grams: 0,
      category_ref: '',
    },
  })
  const { mutate: patchItem } = usePatchData(['restaurant_menu'])

  const onOpenAndSetForm = (datas: ItemFormValue) => {
    for (const [fieldName, value] of Object.entries(datas)) {
      form.setFieldValue(fieldName, value !== null ? value : undefined)
    }
    open()
  }

  const handleItemToFormData = (datas: ItemType, formData: FormData): FormData => {
    if (!(datas.image instanceof File)) {
      datas.image = null
    }
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
    <div>
      {data?.categories.map((category) => (
        <div key={category.id}>
          <Text fz={22} fw={500} my="md" ml="xs">
            {category.name}
          </Text>

          <SimpleGrid
            cols={{
              base: 1,
              xs: 2,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
            }}
            mx="xs"
          >
            <ItemBuilder category_ref={category.id} />

            {category.items.map((item) => (
              <Item item={item} key={item.id} onActionClick={onOpenAndSetForm} />
            ))}
          </SimpleGrid>
        </div>
      ))}

      <Modal
        scrollAreaComponent={ScrollArea.Autosize}
        opened={opened}
        onClose={close}
        title={
          <Text fw={700} fz="xl">
            Правки позиции
          </Text>
        }
        size="xl"
      >
        <ItemForm
          form={form}
          formSubmit={() => {
            const formData = new FormData()
            const datas = handleItemToFormData(form.values, formData)
            for (let pair of formData.entries()) {
              console.log(pair[0] + ': ' + pair[1])
            }
            patchItem({
              key: `menu_item/${form.values.id}/`,
              datas: datas,
            })

            close()
          }}
        >
          <Button
            size="xl"
            color="red"
            variant="light"
            onClick={() => {
              deleteItem(`menu_item/${form.values.id}/`)
              close()
            }}
          >
            <Box hiddenFrom="xs">
              <IconTrash stroke={1.5} />
            </Box>
            <Text visibleFrom="xs" fz={20}>
              Удалить
            </Text>
          </Button>
          <Button type="submit" size="xl">
            <Box hiddenFrom="xs">
              <IconDeviceFloppy stroke={1.5} />
            </Box>
            <Text visibleFrom="xs" fz={20}>
              Сохранить
            </Text>
          </Button>
        </ItemForm>
      </Modal>
    </div>
  )
}
