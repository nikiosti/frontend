'use client'

import { UseFormReturnType } from '@mantine/form'

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { Group, Image, Text, TextInput } from '@mantine/core'
import { Restaurant } from '@/types/Restaurant'

import styles from './Restaurant.module.css'
export const RestaurantForm = ({
  form,
  formSubmit,
  handleDrop,
  children,
}: {
  form: UseFormReturnType<Restaurant>
  formSubmit: () => void
  handleDrop: (acceptedFiles: File[]) => void
  children: React.ReactNode
}) => {
  return (
    <form onSubmit={form.onSubmit(formSubmit)}>
      <TextInput {...form.getInputProps('name')} label="Название заведения" placeholder="Макдокнак" required />

      <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 * 1024} className={styles.dropzone}>
        {form.values.image ? (
          <Image
            radius={8}
            src={form.values.image instanceof File ? URL.createObjectURL(form.values.image) : form.values.image}
            alt="Фотокарточка заведения"
          />
        ) : (
          <Text fw={500} size="md">
            Выберите изображение или перетащите его сюда
          </Text>
        )}
      </Dropzone>

      <TextInput {...form.getInputProps('address')} mt="xs" label="Адрес" placeholder="Метро Первомайская" />

      <Group wrap="wrap" mt="xs">
        {children}
      </Group>
    </form>
  )
}
