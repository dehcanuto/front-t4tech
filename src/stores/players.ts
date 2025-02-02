import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type { IPlayer, PlayerState } from '@/models/player'

const toast = useToast()

export const usePlayersStore = defineStore('players', {
  state: (): PlayerState => ({
    favorites: [],
    isLoading: false,
  }),
  actions: {
    setFavoritePlayer(item: IPlayer) {
      const playerIndex = this.favorites.findIndex((player) => player.id === item.id)

      if (playerIndex === -1 || this.favorites.length === 0) {
        this.favorites.push(item)
        toast.success(`Player ${item.first_name} added to favorites successfully`)
      } else {
        this.favorites.splice(playerIndex, 1)
        toast.info(`Player ${item.first_name} removed from favorites.`)
      }
    },
    isFavorite(item: IPlayer) {
      console.log('this.favorites.length', this.favorites.length)
      if (this.favorites.length === 0) return false
      const exists = this.favorites.some((player) => player.id === item.id)
      return exists
    },
  },
})
