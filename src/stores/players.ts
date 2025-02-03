import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type { IPlayer, PlayerState } from '@/models/player'

const toast = useToast()

export const usePlayersStore = defineStore('players', {
  state: (): PlayerState => ({
    players: [],
    favorites: [],
    isLoading: false,
  }),
  actions: {
    setPlayers(item: IPlayer[]) {
      this.players = item
    },
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
      if (this.favorites.length === 0) return false
      const exists = this.favorites.some((player) => player.id === item.id)
      return exists
    },
    removePlayer(playerId: number): Promise<IPlayer[]> {
      return new Promise((resolve) => {
        const updatedPlayers = this.players.filter((item) => item.id !== playerId)
        this.setPlayers(updatedPlayers)
        resolve(updatedPlayers)
      })
    },
  },
})
