'use client'

import { useEffect } from 'react'

import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button, Paper, Container, Title, AppShell, Center, Text, Group } from '@mantine/core'

import { useLogin } from '@/hook/useLogin'
import { useRouter } from 'next/navigation'

import styles from './Login.module.css'

import Link from 'next/link'
import { Logotype } from '../General/Logo/Logotype'

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
    <AppShell
      header={{
        height: 50,
      }}
      padding={5}
    >
      <AppShell.Header bg="#ecedfd" px="xs">
        <Group h="100%" justify="space-between">
          <Link href="/">
            <Logotype />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Main bg="#ecedfd">
        <Container maw={460} mt="xl">
          <Paper p="xl" radius={12}>
            <form onSubmit={form.onSubmit(handleLogin)}>
              <Title order={4} fz={30} ta="center">
                Вход
              </Title>

              <TextInput {...form.getInputProps('username')} mt="xs" size="lg" placeholder="Логин" required />
              <PasswordInput {...form.getInputProps('password')} mt="xs" size="lg" placeholder="Пароль" required />
              <Button type="submit" loading={isPending} mt="lg" fullWidth radius="xl" size="lg">
                Войти
              </Button>
            </form>
            <Link href="/register">
              <Text c="dimmed" ta="center" mt="xs">
                Регестрация
              </Text>
            </Link>
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
