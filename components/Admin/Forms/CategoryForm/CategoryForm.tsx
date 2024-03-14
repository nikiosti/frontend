'use client'
import { CategoryItem } from '@/types/Category'
import { Box, Group, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

export const CategoryForm = ({
  form,
  formSubmit,
  children,
}: {
  form: UseFormReturnType<CategoryItem>
  formSubmit: () => void
  children: React.ReactNode
}) => {
  return (
    <form onSubmit={form.onSubmit(formSubmit)}>
      <TextInput
        {...form.getInputProps('name')}
        data-autofocus
        required
        placeholder="Напитки"
        label="Название категории"
      />
      <Box mt="xs">{children}</Box>
    </form>
  )
}
