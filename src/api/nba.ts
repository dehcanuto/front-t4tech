import api from './api'
import type { IPlayer } from '@/models/player'

class NbaService {
  async fetchPlayers(search: string = ''): Promise<IPlayer[]> {
    const params = search ? { search } : {}
    const response = await api.get('/players', { params })
    return response.data.data
  }

  async getPlayer(id: number | string): Promise<IPlayer> {
    const response = await api.get(`/players/${id}`)
    return response.data.data
  }

  async updatePlayer(player: IPlayer): Promise<IPlayer> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(player), 1000)
    })
  }

  async deletePlayer(playerId: number): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(playerId), 1000)
    })
  }
}

export const nbaService = new NbaService()
