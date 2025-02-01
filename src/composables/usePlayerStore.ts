import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import { nbaService } from '@/api/nba'
import type { IPlayer } from '@/models/player'
import { getValueNested } from '@/utils/nestedValues'

const toast = useToast()

export function usePlayerStore() {
  const players = ref<IPlayer[]>([])
  const search = ref<string>('')
  const ascOrder = ref<boolean>(true)
  const isLoading = ref<boolean>(false)

  const fetchData = async () => {
    try {
      isLoading.value = true
      players.value = await nbaService.fetchPlayers(search.value)
      toast.success('Players loaded successfully')
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong. Try again later')
    } finally {
      isLoading.value = false
    }
  }

  const getPlayer = async (id: number) => {
    try {
      isLoading.value = true
      const response = await nbaService.getPlayer(id)
      toast.success('Player loaded successfully')
      return response
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong. Try again later')
    } finally {
      isLoading.value = false
    }
  }

  const sortPlayers = (column: 'full_name' | keyof IPlayer) => {
    const columnFilter: keyof IPlayer = column === 'full_name' ? 'first_name' : column

    players.value.sort((a, b) => {
      const valueA = getValueNested(a, columnFilter)
      const valueB = getValueNested(b, columnFilter)

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return ascOrder.value ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return ascOrder.value ? valueA - valueB : valueB - valueA
      }

      return 0
    })
    ascOrder.value = !ascOrder.value
  }

  const confirmDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este jogador?')) {
      await nbaService.deletePlayer(id)
      fetchData()
    }
  }

  return { players, search, isLoading, ascOrder, fetchData, getPlayer, sortPlayers, confirmDelete }
}
