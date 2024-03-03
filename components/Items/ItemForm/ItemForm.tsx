'use client'

//Mantine
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Group,
  Image,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

//Types
import { IconCircleMinus, IconPhoto } from '@tabler/icons-react'
import { Item, ItemPrice } from '@/types/RestaurantMenu'
import { usePostData } from '@/hook/usePostData'

export const ItemForm = ({
  form,
  formSubmit,
  children,
}: {
  form: UseFormReturnType<Item>
  formSubmit: () => void
  children: React.ReactNode
}) => {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setFieldValue('image', acceptedFiles[0])
    }
  }

  const ItemsPrices = form.values.prices.map((item, index) => (
    <Group mt="xs" grow preventGrowOverflow={false} align="end" key={index}>
      <TextInput
        {...form.getInputProps(`prices.${index}.size_description`)}
        label={'Описание'}
        placeholder="Мега капуч"
        required
      />
      <NumberInput
        {...form.getInputProps(`prices.${index}.price`)}
        label="Цена позиции"
        min={0}
        max={1000}
        decimalScale={2}
        fixedDecimalScale
        placeholder="9.50 BYN"
        required
      />

      <ActionIcon
        flex={1}
        variant="white"
        color="white"
        radius={12}
        miw={60}
        mih={60}
        w={60}
        h={60}
        onClick={() => form.removeListItem('prices', index)}
      >
        <IconCircleMinus stroke={1.5} style={{ width: '70%', height: '70%' }} fill="red" />
      </ActionIcon>
    </Group>
  ))

  return (
    <>
      <form onSubmit={form.onSubmit(formSubmit)}>
        <TextInput
          {...form.getInputProps('name')}
          data-autofocus
          required
          label="Название позиции"
          placeholder="Хинкали классические"
        />

        <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 * 1024} mt="xs" radius={12}>
          {form.values.image ? (
            form.values.image instanceof File ? (
              <Image
                mah={250}
                maw={250}
                radius={8}
                src={URL.createObjectURL(form.values.image)}
                alt="Новое заведение"
              />
            ) : (
              <Image radius={8} mah={250} maw={250} src={form.values.image_url} alt="Новое заведение" />
            )
          ) : (
            <Group>
              <IconPhoto stroke={1.5} />
              <Text fz="xl" ta="center">
                Выберите картинку или перетащите ее сюда
              </Text>
            </Group>
          )}
        </Dropzone>

        {ItemsPrices}

        <Button
          mt="lg"
          fullWidth
          color="#000"
          onClick={() =>
            form.insertListItem('prices', {
              size_description: '',
              price: '',
            })
          }
          size="xl"
          styles={{
            label: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            },
          }}
        >
          Добавить вариацию
        </Button>

        <TextInput {...form.getInputProps('cooking_time')} label="Время готовки" mt="xs" placeholder="12 минут" />

        <Textarea
          {...form.getInputProps('description')}
          label="Описание"
          placeholder="Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо"
          mt="xs"
        />

        <Group wrap="wrap" mt="xs">
          {children}
        </Group>
      </form>
    </>
  )
}
