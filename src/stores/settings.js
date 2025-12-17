/**
 * Settings Store
 * Manages application-wide settings and preferences
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // UI Settings
  const showNodeHeaders = ref(false) // Default: headers hidden

  // Actions
  function toggleNodeHeaders() {
    showNodeHeaders.value = !showNodeHeaders.value
  }

  function setNodeHeaders(value) {
    showNodeHeaders.value = value
  }

  return {
    // State
    showNodeHeaders,

    // Actions
    toggleNodeHeaders,
    setNodeHeaders
  }
})
