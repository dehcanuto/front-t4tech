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
      if (this.favorites.length === 0) return this.favorites.push(item)

      const playerIndex = this.favorites.findIndex((player) => player.id === item.id)

      if (playerIndex === -1) {
        this.favorites.push(item)
        toast.success(`Player ${item.first_name} added to favorites successfully`)
      } else {
        this.favorites.splice(playerIndex, 1)
        toast.info(`Player ${item.first_name} removed from favorites.`)
      }
    },
  },
})
