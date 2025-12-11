import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlowStore = defineStore('flow', () => {
  // State
  const nodes = ref([])
  const edges = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  const reset = () => {
    nodes.value = []
    edges.value = []
    error.value = null
    isLoading.value = false
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setError = (err) => {
    error.value = err
  }

  const clearError = () => {
    error.value = null
  }

  return {
    nodes,
    edges,
    isLoading,
    error,
    reset,
    setLoading,
    setError,
    clearError
  }
})
