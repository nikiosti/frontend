'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

import {
  Button,
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
    components: {
      PasswordInput: PasswordInput.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'xl',
          styles: {
            input: {
              border: 0,
            },
          },
        },
      }),
      TextInput: TextInput.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'xl',
          styles: {
            input: {
              border: 0,
            },
          },
        },
      }),
      NumberInput: NumberInput.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'xl',
          styles: {
            input: {
              border: 0,
            },
          },
        },
      }),
      Textarea: Textarea.extend({
        classNames: classes,
        defaultProps: {
          radius: 12,
          size: 'xl',
          styles: {
            input: {
              border: 0,
            },
          },
        },
      }),

      Button: Button.extend({ defaultProps: { color: 'green', radius: 12, fw: 400, size: 'xl' } }),

      Modal: Modal.extend({
        defaultProps: {
          radius: 12,
          styles: {
            header: {
              backgroundColor: '#F0F0F4',
            },
            body: {
              backgroundColor: '#F0F0F4',
            },
            content: {
              backgroundColor: '#F0F0F4',
            },
          },
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
