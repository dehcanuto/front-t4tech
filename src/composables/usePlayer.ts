import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import { nbaService } from '@/api/nba'
import type { IPlayer } from '@/models/player'

const toast = useToast()

export function usePlayer() {
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  const isRemoving = ref<boolean>(false)

  const fetchData = async (pagination: number = 0) => {
    try {
      toast('Loading Players...')
      isLoading.value = true
      const response = await nbaService.fetchPlayers(pagination)
      toast.success('Players loaded successfully')
      return response
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong. Try again later')
    } finally {
      isLoading.value = false
    }
  }

  const getPlayer = async (id: number | string) => {
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

  const updatePlayer = async (player: IPlayer) => {
    try {
      toast('updating player...')
      isLoading.value = true
      const response = await nbaService.updatePlayer(player)
      toast.success('Player updated successfully')
      return response
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong. Try again later')
    } finally {
      isLoading.value = false
    }
  }

  const removePlayer = async (playerId: number) => {
    try {
      toast('removing player...')
      isLoading.value = true
      const response = await nbaService.removePlayer(playerId)
      toast.success('Player removed successfully')
      return response
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong. Try again later')
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isRemoving,
    isSaving,
    fetchData,
    getPlayer,
    updatePlayer,
    removePlayer,
  }
}
