'use client'

import { useEffect } from 'react'

import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button, Paper, Container, Title } from '@mantine/core'

import { useLogin } from '@/hook/useLogin'
import { useRouter } from 'next/navigation'

export const Login = () => {
  const { mutate: login, data, isSuccess, isError, isPending } = useLogin()
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      router.push('/admin')
    }
  }, [isSuccess, isError])

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const router = useRouter()
  const handleLogin = () => {
    login(form.values)
  }

  return (
    <Container size={420} my={40}>
      <Paper p={30} mt={30} radius={12} bg="#F0F0F4">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Title ta="center"> Вход</Title>

          <TextInput {...form.getInputProps('username')} mt="xs" size="xl" placeholder="Логин" />
          <PasswordInput {...form.getInputProps('password')} mt="xs" size="xl" placeholder="Пароль" />
          <Button type="submit" loading={isPending} mt="lg" fullWidth radius="xl">
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
