export type ItemPrice = {
  id: string
  menu_item_ref: string
  size_description: string
  price: number
}

export type Item = {
  id: string
  name: string

  image: File | null
  image_url: string

  stop_list: boolean
  cooking_time?: string

  description: string | null
  category_ref: string
  prices: ItemPrice[]
}

export type Category = {
  id: string
  items: Item[]
  name: string
  descriptions: string | null
  restaurant_ref: string
}

export type RestaurantMenu = {
  id: string
  categories: Category[]
  name: string
  image: string | null
  address: string | null
  is_visible: boolean | null
  working_hours: string | null
  wifi_password: string | null
}
