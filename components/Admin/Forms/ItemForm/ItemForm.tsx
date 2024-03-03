'use client'

import { ActionIcon, Button, Group, Image, NumberInput, Text, TextInput, Textarea } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

import { Item } from '@/types/RestaurantMenu'

import { IconCircleMinus } from '@tabler/icons-react'

import styles from './ItemForm.module.css'

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
        placeholder="Мега капучино 400 мл"
        required
      />
      <NumberInput
        {...form.getInputProps(`prices.${index}.price`)}
        label="Цена позиции"
        min={0}
        max={1000}
        decimalScale={2}
        fixedDecimalScale
        placeholder="7 рублей"
        required
      />

      <ActionIcon className={styles.icon__button} onClick={() => form.removeListItem('prices', index)}>
        <IconCircleMinus stroke={1.5} className={styles.icon} />
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
          placeholder="Капучино"
        />

        <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 * 1024} className={styles.dropzone}>
          {form.values.image ? (
            form.values.image instanceof File ? (
              <Image className={styles.image} src={URL.createObjectURL(form.values.image)} alt="Новое заведение" />
            ) : (
              <Image className={styles.image} src={form.values.image_url} alt="Новое заведение" />
            )
          ) : (
            <Text fw={500}>Выберите изображение или перетащите его сюда</Text>
          )}
        </Dropzone>

        {ItemsPrices}

        <Button
          mt="xs"
          fullWidth
          color="#000"
          onClick={() =>
            form.insertListItem('prices', {
              size_description: '',
              price: '',
            })
          }
          classNames={{ label: styles.text__space }}
        >
          Добавить вариацию
        </Button>

        <TextInput {...form.getInputProps('cooking_time')} label="Время готовки" mt="xs" placeholder="12 минут" />

        <Textarea
          {...form.getInputProps('description')}
          label="Описание"
          placeholder="Капучино — это не просто кофе с молоком, а настоящее наслаждение под пышной шапкой из молочной пенки."
          mt="xs"
        />

        <Group wrap="wrap" mt="xs">
          {children}
        </Group>
      </form>
    </>
  )
}
