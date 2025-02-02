import { sortValues } from './sortValues'

import type { IPlayer } from '@/models/player'
import type { IColumn } from '@/models/table'
import { ref } from 'vue'

export const ascOrder = ref<boolean>(true)

export const filterData = (data: IPlayer[], searchTerm: string) => {
  if (!searchTerm) return data
  return data.filter((player) => player.first_name.toLowerCase().includes(searchTerm.toLowerCase()))
}

export const sortDataValues = (
  column: IColumn['field'],
  data: IPlayer[],
  order: boolean = ascOrder.value,
) => {
  ascOrder.value = !order
  return sortValues(data, column, order)
}
