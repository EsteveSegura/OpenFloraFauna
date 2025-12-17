/**
 * Composable for Viewport Controls
 * Handles lock/unlock canvas and fit view functionality
 */

import { ref } from 'vue'

export function useViewportControls(fitView) {
  const isLocked = ref(false)

  /**
   * Toggle lock/unlock canvas
   */
  function handleLockToggle() {
    isLocked.value = !isLocked.value
  }

  /**
   * Fit view to show all nodes
   */
  function handleFitView() {
    fitView({ duration: 300, padding: 0.2 })
  }

  return {
    isLocked,
    handleLockToggle,
    handleFitView
  }
}
