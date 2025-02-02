import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import { nbaService } from '@/api/nba'
import type { IPlayer } from '@/models/player'

const toast = useToast()

export function usePlayerStore() {
  const players = ref<IPlayer[]>([])
  const search = ref<string>('')
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  const isRemoving = ref<boolean>(false)

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

  const confirmDelete = async (id: number) => {
    try {
      isRemoving.value = true

      await nbaService.deletePlayer(id)
      toast.success('player removed successfully')
      fetchData()
    } catch (error) {
      toast.error('Something went wrong. Try again later')
    } finally {
      isRemoving.value = false
      return false
    }
  }

  const savePlayer = async (form: any) => {
    try {
      isSaving.value = true
      await nbaService.updatePlayer(form)
      toast.success('player edited successfully')
    } catch (error) {
      toast.error('Something went wrong. Try again later')
    } finally {
      isSaving.value = false
    }
  }

  return {
    players,
    search,
    isLoading,
    isRemoving,
    isSaving,
    fetchData,
    getPlayer,
    confirmDelete,
    savePlayer,
  }
}
