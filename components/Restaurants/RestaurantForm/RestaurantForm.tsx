'use client'

import { UseFormReturnType } from '@mantine/form'

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { Avatar, Checkbox, Group, Image, Paper, Text, TextInput } from '@mantine/core'
import { Restaurant } from '@/types/Restaurant'
import { IconPhoto } from '@tabler/icons-react'
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
      <TextInput {...form.getInputProps('name')} label="Название заведения" placeholder="Макшнакнес" required />

      <Dropzone
        onDrop={handleDrop}
        accept={IMAGE_MIME_TYPE}
        maxSize={5 * 1024 * 1024}
        radius={12}
        mt="xs"
        title="ldskfls"
      >
        {form.values.image ? (
          form.values.image instanceof File ? (
            <Image radius={12} maw={250} mah={250} src={URL.createObjectURL(form.values.image)} alt="Restaurant" />
          ) : (
            <Image radius={12} maw={250} mah={250} src={form.values.image} alt="Restaurant" />
          )
        ) : (
          <Group>
            <IconPhoto stroke={1.5} />
            <Text fz="xl" ta="center">
              Выберите картинку или перетащи ее сюда
            </Text>
          </Group>
        )}
      </Dropzone>
      <TextInput {...form.getInputProps('address')} mt="xs" label="Адрес заведения" placeholder="Метро Первомайская" />

      <Group grow mt="xs">
        {children}
      </Group>
    </form>
  )
}
