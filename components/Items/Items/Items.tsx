'use client'

//Components
import { Item } from '../Item/Item'
import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { ItemBuilder } from '../ItemBulider/ItemBuilder'
import { Item as ItemType, RestaurantMenu } from '@/types/RestaurantMenu'

//Hooks
import { usePatchData } from '@/hook/usePatchData'
import { useDeleteData } from '@/hook/useDeleteData'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
//Types
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
      image: null,
      image_url: '',
      description: '',

      stop_list: false,
      cooking_time: '',

      category_ref: '',
    },
  })
  const { mutate: patchItem } = usePatchData(['restaurant_menu'])

  const onOpenAndSetForm = (datas: ItemType) => {
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
          <Text fz={30} fw={500} my="md">
            {category.name}
          </Text>

          <SimpleGrid
            cols={{
              base: 1,
              xs: 2,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
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
        size="lg"
      >
        <ItemForm
          form={form}
          formSubmit={() => {
            const formData = new FormData()
            const datas = handleItemToFormData(form.values, formData)

            patchItem({
              key: `menu_item/${form.values.id}/`,
              datas: datas,
            })

            close()
          }}
        >
          <Button type="submit" fullWidth radius="xl">
            Сохранить
          </Button>
          <Container>
            <UnstyledButton
              mt="xs"
              onClick={() => {
                deleteItem(`menu_item/${form.values.id}/`)
                close()
              }}
            >
              <Text c="dimmed">Удалить</Text>
            </UnstyledButton>
          </Container>
        </ItemForm>
      </Modal>
    </div>
  )
}
