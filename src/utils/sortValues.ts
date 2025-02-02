import type { IPlayer } from '@/models/player'
import { getValueNested } from './nestedValues'
import type { IColumn } from '@/models/table'

export const sortValues = (data: IPlayer[], column: IColumn['field'], ascOrder: boolean) => {
  const columnFilter = column === 'full_name' ? 'first_name' : column

  return data.sort((a, b) => {
    const valueA = getValueNested(a, columnFilter)
    const valueB = getValueNested(b, columnFilter)

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return ascOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return ascOrder ? valueA - valueB : valueB - valueA
    }

    return 0
  })
}
