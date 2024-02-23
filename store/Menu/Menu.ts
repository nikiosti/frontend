// import { Item } from '@/types/RestaurantMenu'
import { Item, ItemPrice } from '@/types/RestaurantMenu'
import { create } from 'zustand'

export type GroupedItem = {
  item: Item
  price: ItemPrice
  quantity: number
}

type MenuStore = {
  //TODO : CHANGE NAME ITEM TO ITEMCART
  items: GroupedItem[]
  addItem: (item: Item, price: ItemPrice) => void
  removeItem: (itemId: string) => void
  setQuantity: (itemId: string, price : ItemPrice, number: number) => void

  clearItems: () => void
}

export const useMenuStore = create<MenuStore>((set) => ({
  items: [],
  addItem: (item, price) => {
    set((state) => {
      const existingItem = state.items.find(
        (groupedItem) => groupedItem.item.id === item.id && groupedItem.price.id === price.id
      )
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ item, price, quantity: 1 })
      }
      return { items: [...state.items] }
    })
  },

  removeItem: (itemId) => {
    set((state) => {
      const itemIndex = state.items.findIndex((item) => item.item.id === itemId)
      if (itemIndex !== -1) {
        const updatedItems = [...state.items]
        updatedItems.splice(itemIndex, 1)
        return { items: updatedItems }
      }
      return state
    })
  },

  setQuantity: (itemId, price,  number) => {
    set((state) => {
      const itemIndex = state.items.findIndex(
        (groupedItem) => groupedItem.item.id === itemId && groupedItem.price.id === price.id
      )

      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity >= 1) {
          state.items[itemIndex].quantity += number
        }
        if (state.items[itemIndex].quantity === 0) {
          const updatedItems = [...state.items]
          updatedItems.splice(itemIndex, 1)
          return { items: updatedItems }
        }
      }
      return { items: [...state.items] }
    })
  },

  clearItems: () =>
    set({
      items: [],
    }),
}))
