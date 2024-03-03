'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

import {
  Button,
  Group,
  MantineProvider,
  Modal,
  NumberInput,
  PasswordInput,
  TextInput,
  Textarea,
  createTheme,
} from '@mantine/core'

const queryClientOptions = {}

import classes from './ReactQueryMantineProvider.module.css'

const ReactQueryMantineProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClientStore] = useState(() => new QueryClient(queryClientOptions))

  const theme = createTheme({
    activeClassName: classes.active,
    components: {
      PasswordInput: PasswordInput.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'lg',
          styles: {
            input: {
              border: 0,
              backgroundColor: '#F4F4F4',
            },
          },
        },
      }),
      TextInput: TextInput.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'lg',
          styles: {
            input: {
              border: 0,
              backgroundColor: '#F4F4F4',
            },
          },
        },
      }),
      NumberInput: NumberInput.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'lg',
          styles: {
            input: {
              border: 0,
              backgroundColor: '#F4F4F4',
            },
          },
        },
      }),
      Textarea: Textarea.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'lg',
          styles: {
            input: {
              border: 0,
              backgroundColor: '#F4F4F4',
            },
          },
        },
      }),

      Button: Button.extend({
        defaultProps: { color: 'violet.6', radius: 'xl', fw: 400, size: 'lg' },
      }),

      Modal: Modal.extend({
        defaultProps: {
          radius: 12,
        },
      }),
    },
  })
  return (
    <QueryClientProvider client={queryClientStore}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  )
}

export { ReactQueryMantineProvider }
