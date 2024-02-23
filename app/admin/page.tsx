'use client'
import { Center, Text } from '@mantine/core'
import { Restaurants } from '@/components/Restaurants/Restaurants/Restaurants'
import Image from 'next/image'

const Admin = () => {
  return (
    <Center my="xl">
      <div>
        <Image alt="" width={250} height={250} src={'/undraw_barbecue_3x93.svg'} />
        <Text ta="center">Выберите заведения</Text>

        <Center my="xl">
          <Restaurants />
        </Center>
      </div>
    </Center>
  )
}

export default Admin
