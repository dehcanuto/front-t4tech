import api from './api'
import type { IPlayer, IPlayerEditForm } from '@/models/player'

class NbaService {
  async fetchPlayers(pagination: number = 0): Promise<IPlayer[]> {
    const params = { cursor: pagination * 25, per_page: 25 }
    const response = await api.get('/players', { params })
    return response.data.data
  }

  async getPlayer(id: number | string): Promise<IPlayer> {
    const response = await api.get(`/players/${id}`)
    return response.data.data
  }
}

export const nbaService = new NbaService()
