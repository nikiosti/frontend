'use client'

import { Item, Logotype } from '@/components/General'

import {
  AppShell,
  Group,
  Button,
  Text,
  Container,
  Title,
  Image,
  SimpleGrid,
  Paper,
  TextInput,
  Center,
  Box,
  Avatar,
  Grid,
} from '@mantine/core'
import Link from 'next/link'

import styles from './page.module.css'

import { RestaurantsAvatarGroup, CartItemsGroup, VariablePricing } from '@/components/Lending'

import { useForm } from '@mantine/form'

const Home = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный адрес'),
    },
  })

  return (
    <>
      <AppShell
        header={{
          height: 50,
          collapsed: false,
        }}
      >
        <AppShell.Header px="xs">
          <Group h="100%" justify="space-between">
            <Logotype />
            <Group justify="flex-end">
              <Link href="/login">
                <Text className={styles.link}>Войти</Text>
              </Link>
              <Button size="sm">Начать</Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main bg="#F4F4F4">
          <Container size="md" p="xs">
            <Title mt="xl" order={1} className={styles.titleText}>
              Простое электронное меню и&nbsp;ничего лишнего.
            </Title>
            <Text ta="center" mt="xl" className={styles.bodyText}>
              Админ панель, корзина, карточки позиций разделенные на категории, стоп-листы. Все, что нужно для ваших
              гостей.
            </Text>

            <Center>
              <Button mt="xl">Начать бесплатно</Button>
            </Center>
            <Image src={'/ImagePage.png'} radius={12} mt="xl" />

            <Title mt="xl" order={2} className={styles.titleText}>
              &laquo;Едадед&raquo; помогает заведениям получить больше лояльных гостей.
            </Title>
            <SimpleGrid
              verticalSpacing={50}
              mt="xl"
              spacing="xs"
              cols={{
                base: 1,
                md: 2,
              }}
            >
              <div>
                <Paper className={styles.card}>
                  <VariablePricing />
                </Paper>
                <Text mt="xs" className={styles.subTitleText}>
                  Вариативное ценообразование
                </Text>
                <Text mt="xs" className={styles.bodyText}>
                  Электронное меню позволяет вам гибко устанавливать цены в зависимости от объема, веса или количества
                  продуктов.
                </Text>
              </div>

              <div>
                <Paper className={styles.card}>
                  <Group h="100%" justify="center">
                    <RestaurantsAvatarGroup />
                  </Group>
                </Paper>
                <Text mt="xs" className={styles.subTitleText}>
                  Управление несколькими заведениями
                </Text>
                <Text mt="xs" className={styles.bodyText}>
                  Удобный интерфейс позволяет вам быстро найти нужную позицию, категорию или ресторан и внести
                  необходимые изменения в два клика.
                </Text>
              </div>

              <div>
                <Paper className={styles.card}>
                  <Group justify="center">
                    <CartItemsGroup />
                  </Group>
                </Paper>
                <Text mt="xs" className={styles.subTitleText}>
                  Корзина
                </Text>
                <Text mt="xs" className={styles.bodyText}>
                  Электронное меню оснащено удобной корзиной, которая позволяет пользователям собирать заказ и мгновенно
                  узнавать итоговую цену.
                </Text>
              </div>

              <div>
                <Paper className={styles.card}>
                  <Group h="100%" justify="center">
                    <Box w={250}>
                      <Item
                        onActionClick={() => {}}
                        item={{
                          category_ref: '',
                          description: '',
                          id: '',
                          image: null,
                          image_url: 'https://s1.eda.ru/StaticContent/Photos/161125164152/161206150112/p_O.jpg',
                          name: 'Харчо',
                          prices: [
                            {
                              id: '',
                              menu_item_ref: '',
                              price: 15,
                              size_description: '200 грамм',
                            },
                          ],
                          stop_list: false,
                          cooking_time: '10 минут',
                        }}
                      />
                    </Box>
                  </Group>
                </Paper>
                <Text mt="xs" className={styles.subTitleText}>
                  Превосходные карточки позиций
                </Text>
                <Text mt="xs" className={styles.bodyText}>
                  Полноразмерное изображение, которое занимает всю площадь карточки. Вы можете загрузить вертикальное
                  фото с телефона, и оно автоматически будет заполнено и оптимально отображаться.
                </Text>
              </div>
            </SimpleGrid>
            <Title mt="xl" order={2} className={styles.titleText}>
              &laquo;Едадед&raquo; помогает новым гостям влюбиться в вашу кухню.
            </Title>

            <Grid mt="xl">
              <Grid.Col span={6}>
                <Paper radius={12} p="md">
                  <Group align="flex-end">
                    <Text mt="xs" className={styles.subTitleText}>
                      Всегда под рукой
                    </Text>
                  </Group>
                  <Text mt="xs" className={styles.bodyText}>
                    Полноразмерное изображение, которое занимает всю площадь карточки. Вы можете загрузить вертикальное
                    фото с телефона, и оно автоматически будет заполнено и оптимально отображаться.
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper radius={12} p="md">
                  <Text mt="xs" className={styles.subTitleText}>
                    Безопасно
                  </Text>
                  <Text mt="xs" className={styles.bodyText}>
                    Полноразмерное изображение, которое занимает всю площадь карточки. Вы можете загрузить вертикальное
                    фото с телефона, и оно автоматически будет заполнено и оптимально отображаться.
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper radius={12} p="md">
                  <Text mt="xs" className={styles.subTitleText}>
                    Актуально
                  </Text>
                  <Text mt="xs" className={styles.bodyText}>
                    Полноразмерное изображение, которое занимает всю площадь карточки. Вы можете загрузить вертикальное
                    фото с телефона, и оно автоматически будет заполнено и оптимально отображаться.
                  </Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper radius={12} p="md">
                  <Text mt="xs" className={styles.subTitleText}>
                    Актуально
                  </Text>
                  <Text mt="xs" className={styles.bodyText}>
                    Полноразмерное изображение, которое занимает всю площадь карточки. Вы можете загрузить вертикальное
                    фото с телефона, и оно автоматически будет заполнено и оптимально отображаться.
                  </Text>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Paper radius={12} p="md" mt="xl">
                  <form
                    onSubmit={form.onSubmit((values) => {
                      form.validate()
                    })}
                  >
                    <Text c="#000" className={styles.subTitleText} lh={1}>
                      Заказ электронного меню
                    </Text>
                    <Text c="#000" mt="xs" className={styles.bodyText}>
                      Для начала работы нам надо поговорить. Достаточно указать контакты, и мы свяжемся, чтобы все
                      обсудить.
                    </Text>
                    <TextInput mt="xs" placeholder="Имя" {...form.getInputProps('name')} />
                    <TextInput mt="xs" placeholder="Электропочта" {...form.getInputProps('email')} />
                    <TextInput mt="xs" placeholder="Телефон" {...form.getInputProps('phone')} />
                    <Button type="submit" mt="xs">
                      Заказать
                    </Button>
                  </form>
                </Paper>
              </Grid.Col>
            </Grid>
          </Container>
          <Paper mt="xl" py="xl">
            <Container size="md">
              <Text c="dimmed">Едадед 2024</Text>
            </Container>
          </Paper>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

export default Home
