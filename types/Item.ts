interface MenuItem {
  id: number
  category_ref: string
  name: string
  description: string | null
  price: number | null
  weight_in_grams: number | null
  image: any
}

interface MenuItemPrice {
  id: number
  menu_item_ref: string
  size_description: string
  price: number
}

interface FormMenuItem {
  id: number
  category_ref: string
  name: string
  description: string | null
  price: number | null
  weight_in_grams: number | null
  image: any
}
