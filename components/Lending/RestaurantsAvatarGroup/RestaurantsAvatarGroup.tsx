'use client'

import { Avatar } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

export const RestaurantsAvatarGroup = () => {
  return (
    <Avatar.Group>
      <Avatar
        size="xl"
        src="https://avatars.mds.yandex.net/get-altay/9704097/2a0000018b377a45b94fb419f7aa4abca9b4/XXXL"
      />
      <Avatar size="xl" src="https://media-cdn.tripadvisor.com/media/photo-s/18/f4/2c/46/caption.jpg" />
      <Avatar
        size="xl"
        src="https://avatars.mds.yandex.net/get-altay/5254019/2a0000017c12792541a7f623460ddaa68bd8/L_height"
      />
      <Avatar size="xl">
        <IconPlus />
      </Avatar>
    </Avatar.Group>
  )
}
