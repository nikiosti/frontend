'use client'
import Link from 'next/link'
import { Button } from '@mantine/core'
export const MenuExampleLink = () => {
  return (
    <Link href="/menu/f3943a19-6761-48a5-8d67-d91c8efff921">
      <Button
        h="100%"
        radius={12}
        mih="300"
        w="100%"
        variant="gradient"
        gradient={{ from: 'violet', to: 'blue', deg: 322 }}
      >
        Пример меню
      </Button>
    </Link>
  )
}
