import { sortValues } from './sortValues'

import type { IPlayer } from '@/models/player'
import type { IColumn } from '@/models/table'
import { ref } from 'vue'

export const ascOrder = ref<boolean>(true)

export const filterData = (data: IPlayer[], searchTerm: string) => {
  if (!searchTerm) return data
  return data.filter((player) => {
    const searchTermLower = searchTerm.toLowerCase()

    return Object.keys(player).some((key) => {
      const value = player[key as keyof IPlayer]

      if (value == null) return false

      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(
          (val) => val?.toString().toLowerCase().includes(searchTermLower) ?? false,
        )
      }

      return value.toString().toLowerCase().includes(searchTermLower)
    })
  })
}

export const sortDataValues = (
  column: IColumn['field'],
  data: IPlayer[],
  order: boolean = ascOrder.value,
) => {
  ascOrder.value = !order
  return sortValues(data, column, order)
}
