import type { ITeam } from './team'

export interface IPlayerEditForm {
  first_name: string
  last_name: string
  country: string
  height: string
  weight: string
  position: string
  jersey_number: string
  college: string
  draft_year: number | null
  draft_round: number | null
  draft_number: number | null
}

export interface IPlayer extends IPlayerEditForm {
  id: number
  team: ITeam
}

export interface PlayerState {
  favorites: IPlayer[]
  isLoading: false
}
