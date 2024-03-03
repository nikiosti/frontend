'use client'

//Components
import { Item } from '../Item/Item'
import { Button, Checkbox, Container, Modal, ScrollArea, SimpleGrid, Switch, Text, UnstyledButton } from '@mantine/core'
import { ItemBuilder } from '../ItemBulider/ItemBuilder'
import { Item as ItemType, RestaurantMenu } from '@/types/RestaurantMenu'

//Hooks
import { usePatchData } from '@/hook/usePatchData'
import { useDeleteData } from '@/hook/useDeleteData'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
//Types
import { ItemForm } from '../ItemForm/ItemForm'

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

  const handlePatchMenuItem = () => {
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
      } else if (typeof value === 'boolean') {
        formData.append(key, value.toString())
      }
    })

    patchItem({
      key: `menu_item/${form.values.id}/`,
      datas: formData,
    })

    close()
  }
  return (
    <div>
      {data?.categories.map((category) => (
        <div key={category.id}>
          <Text fz={30} fw={500} my="md">
            {category.name}
          </Text>

          <SimpleGrid
            spacing={5}
            cols={{
              base: 2,
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
        title={<Switch color="dark" {...form.getInputProps('stop_list', { type: 'checkbox' })} label="Стоп лист" />}
        size="lg"
      >
        <ItemForm form={form} formSubmit={handlePatchMenuItem}>
          <Button type="submit" fullWidth>
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
