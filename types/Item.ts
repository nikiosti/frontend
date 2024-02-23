export interface ItemFormValue {
  id: string
  name: string
  image: File | string | null
  price: number | null
  weight_in_grams: number | null
  description: string | null
  category_ref?: string
}
