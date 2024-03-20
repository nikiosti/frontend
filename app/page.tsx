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
  Divider,
} from '@mantine/core'
import Link from 'next/link'

import styles from './page.module.css'

import {
  RestaurantsAvatarGroup,
  CartItemsGroup,
  VariablePricing,
  MenuExampleLink,
} from '@/components/Lending'

import { useForm, isEmail, isNotEmpty } from '@mantine/form'
import { useScrollIntoView } from '@mantine/hooks'

import { usePostContactForm } from '@/hook/usePostContactForm'

const Home = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phoneOrMessenger: '',
    },

    validate: {
      name: isNotEmpty('Имя должно быть заполнено'),
      email: isEmail('Неверная электропочта'),
      phoneOrMessenger: isNotEmpty('Номер должен быть заполнен'),
    },
  })

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  })

  const { mutate, isPending } = usePostContactForm()

  return (
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
            <Button
              size="sm"
              onClick={() =>
                scrollIntoView({
                  alignment: 'center',
                })
              }
            >
              Начать
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main bg="#ECEDFD">
        <Container size="md" p="xs">
          <Title mt="xl" order={1} className={styles.titleText}>
            Простое электронное меню и&nbsp;ничего лишнего.
          </Title>
          <Text ta="center" mt="xl" className={styles.bodyText}>
            Админ панель, корзина, карточки позиций разделенные на категории,
            стоп-листы. Все, что нужно для ваших гостей.
          </Text>

          <Center>
            <Button
              mt="xl"
              onClick={() =>
                scrollIntoView({
                  alignment: 'center',
                })
              }
            >
              Начать бесплатно
            </Button>
          </Center>
          <Image src={'/ImagePage.png'} radius={12} mt="xl" />

          <Title mt="xl" order={2} className={styles.titleText}>
            &laquo;Едадед&raquo; помогает заведениям получить больше лояльных
            гостей.
          </Title>
          <SimpleGrid
            mt="xl"
            spacing="xs"
            cols={{
              base: 1,
              md: 2,
            }}
          >
            <Paper className={styles.card} withBorder>
              <VariablePricing />
              <Divider my="xs" />
              <Text mt="xs" className={styles.subTitleText}>
                Вариативное ценообразование
              </Text>
              <Text mt="xs" className={styles.bodyText}>
                Гибко устанавливайте цены в зависимости от объема, веса или
                количества продуктов.
              </Text>
            </Paper>
            <Paper className={styles.card} withBorder>
              <RestaurantsAvatarGroup />
              <Divider my="xs" />
              <Text mt="xs" className={styles.subTitleText}>
                Управление несколькими заведениями
              </Text>
              <Text mt="xs" className={styles.bodyText}>
                Удобное управление несколькими заведениями прямо из одной
                платформы.
              </Text>
            </Paper>
            <Paper className={styles.card} withBorder>
              <CartItemsGroup />
              <Divider my="xs" />
              <Text mt="xs" className={styles.subTitleText}>
                Корзина
              </Text>
              <Text mt="xs" className={styles.bodyText}>
                Удобная корзина, которая позволяет пользователям собирать заказ
                и мгновенно узнавать итоговую цену.
              </Text>
            </Paper>

            <Paper className={styles.card} withBorder>
              <Item
                onActionClick={() => {}}
                item={{
                  category_ref: '',
                  description: '',
                  id: '',
                  image: null,
                  image_url:
                    'https://s1.eda.ru/StaticContent/Photos/161125164152/161206150112/p_O.jpg',
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
              <Divider my="xs" />

              <Text mt="xs" className={styles.subTitleText}>
                Превосходные карточки позиций
              </Text>
              <Text mt="xs" className={styles.bodyText}>
                Полноразмерное изображение, которое занимает всю площадь
                карточки.
              </Text>
            </Paper>
          </SimpleGrid>

          <Title mt="xl" order={2} className={styles.titleText}>
            Помогаем гостям влюбиться в вашу кухню
          </Title>

          <SimpleGrid
            mt="xl"
            spacing="xs"
            cols={{
              base: 1,
              md: 2,
            }}
          >
            <Paper radius={12} p="md" withBorder>
              <Group align="flex-end">
                <Text className={styles.subTitleText}>Всегда под рукой</Text>
              </Group>
              <Text mt="xs" className={styles.bodyText}>
                Быстрый доступ к разнообразным блюдам и напиткам прямо сейчас.
              </Text>
            </Paper>
            <Paper radius={12} p="md" withBorder>
              <Text className={styles.subTitleText}>Удобно для компаний</Text>
              <Text mt="xs" className={styles.bodyText}>
                Одна ссылка способна обслужить большую компанию.
              </Text>
            </Paper>
            <Paper radius={12} p="md" withBorder>
              <Text className={styles.subTitleText}>Подробное описание</Text>
              <Text mt="xs" className={styles.bodyText}>
                Ваш гость исследует каждое блюдо с помощью детальных описаний и
                ярких фотографий, чтобы сделать правильный выбор.
              </Text>
            </Paper>
            <Paper radius={12} p="md" withBorder>
              <Text className={styles.subTitleText}>Безопасно</Text>
              <Text mt="xs" className={styles.bodyText}>
                Электронное меню обеспечивает безопасное и гигиеничное
                взаимодействие, минуя бумажную альтернативу.
              </Text>
            </Paper>
            <MenuExampleLink />
            <Paper radius={12} p="md" ref={targetRef} withBorder>
              <form
                onSubmit={form.onSubmit((values) => {
                  form.validate()
                })}
              >
                <Text c="#000" className={styles.subTitleText} lh={1}>
                  Заказ электронного меню
                </Text>
                <Text c="#000" mt="xs" className={styles.bodyText}>
                  Для начала работы нам надо поговорить. Достаточно указать
                  контакты, и мы свяжемся, чтобы все обсудить.
                </Text>
                <TextInput
                  mt="xs"
                  placeholder="Имя"
                  {...form.getInputProps('name')}
                />
                <TextInput
                  mt="xs"
                  placeholder="Электропочта"
                  {...form.getInputProps('email')}
                />
                <TextInput
                  mt="xs"
                  placeholder="Телефон"
                  {...form.getInputProps('phoneOrMessenger')}
                />
                <Button
                  type="submit"
                  mt="xs"
                  loading={isPending}
                  onClick={() => {
                    if (form.isValid()) {
                      mutate(form.values)
                      form.reset()
                      alert('Заявка отправлена')
                    }
                  }}
                >
                  Заказать
                </Button>
              </form>
            </Paper>
          </SimpleGrid>
        </Container>
        <Paper mt="xl" py="xs">
          <Center>
            <Text c="dimmed">&copy;Едадед — электронное меню, 2024</Text>
          </Center>
        </Paper>
      </AppShell.Main>
    </AppShell>
  )
}

export default Home
