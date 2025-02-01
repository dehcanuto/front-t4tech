import { ref } from 'vue'
import { nbaService } from '@/api/nba'
import type { IPlayer } from '@/models/player'

export function usePlayerStore() {
  const players = ref<IPlayer[]>([])
  const search = ref<string>('')

  const fetchData = async () => {
    players.value = await nbaService.fetchPlayers(search.value)
  }

  const sortPlayers = (order: 'asc' | 'desc') => {
    players.value.sort((a, b) =>
      order === 'asc'
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name),
    )
  }

  const confirmDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este jogador?')) {
      await nbaService.deletePlayer(id)
      fetchData()
    }
  }

  return { players, search, fetchData, sortPlayers, confirmDelete }
}
