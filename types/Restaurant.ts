export interface Restaurant {
  id: string
  name: string
  image_url: string | null
  image: File | null
  address: string | null
  is_visible: boolean | null
  working_hours: string | null
  wifi_password: string | null
}

export interface RestaurantListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Restaurant[]
}
