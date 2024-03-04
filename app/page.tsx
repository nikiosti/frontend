'use client'

import { Logotype } from '@/components/General'
import { AppShell, Group, Button, Text, Container, Title, Center } from '@mantine/core'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <AppShell
        header={{
          height: 50,
        }}
        padding="xs"
      >
        <AppShell.Header px="xs" bg="#ecedfd">
          <Group h="100%" justify="space-between">
            <Logotype />

            <Link href="/login">
              <Button size="sm">Войти</Button>
            </Link>
          </Group>
        </AppShell.Header>

        <AppShell.Main bg="#ecedfd">
          <Container mt={50}>
            <Title fw={500} lh={1} ta="center" order={1} visibleFrom="xs" fz={56}>
              Простое электронное меню и ничего лишнего
            </Title>
            <Title fw={500} lh={1} ta="center" order={1} hiddenFrom="xs" fz={36}>
              Простое электронное меню и ничего лишнего
            </Title>

            <Text ta="center" mt="xl" fz={24} lh={1}>
              Админ панель, умная корзина, каталог блюд распределенные по категориям, стоп-листы. Все что нужно для
              повышения лольности ваших гостей.
            </Text>
            <Center mt="xl">
              <Button size="xl">Начать бесплатно</Button>
            </Center>
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

export default Home
