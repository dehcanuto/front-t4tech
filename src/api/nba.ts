import axios from 'axios'
import api from './api'
import type { IPlayer } from '@/models/player'

class NbaService {
  async initPlayers(pagination: number = 0): Promise<IPlayer[]> {
    const params = { cursor: pagination * 25, per_page: 25 }

    const response = await axios.get(`${import.meta.env.VITE_API_BALLDONTLIE_URL}/players`, {
      params: params,
      headers: { Authorization: `${import.meta.env.VITE_API_KEY}` },
    })

    return response.data.data
  }

  async fetchPlayers(pagination: number = 0): Promise<IPlayer[]> {
    const params = { cursor: pagination * 25, per_page: 25 }
    const response = await api.get('/players', { params })

    if (!response.data || response.data.length === 0) {
      const players = await this.initPlayers(pagination)
      await api.post('/players', { players })
      return players
    }

    return response.data
  }

  async getPlayer(id: number | string): Promise<IPlayer> {
    const response = await api.get(`/players/${id}`)
    return response.data
  }

  async updatePlayer(player: IPlayer): Promise<IPlayer> {
    const response = await api.put(`/players/${player.id}`, { player })
    return response.data
  }

  async removePlayer(playerId: number): Promise<IPlayer[]> {
    await api.delete(`/players/${playerId}`)
    const response = await api.get('/players')
    return response.data
  }
}

export const nbaService = new NbaService()
