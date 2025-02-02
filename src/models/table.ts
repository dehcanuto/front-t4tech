import type { IPlayer } from './player'

export interface IColumn {
  label: string
  field: 'full_name' | 'team.full_name' | keyof IPlayer
  sortable: boolean
}
