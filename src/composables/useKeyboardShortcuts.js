/**
 * Composable for Keyboard Shortcuts
 * Handles global keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+G)
 */

import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts({ handleCopy, handlePaste, handleGroup, copiedNode, flowStore }) {
  /**
   * Handle keyboard shortcuts
   */
  function handleKeyDown(event) {
    // Check if we're in an editable field (input, textarea, contenteditable)
    const isEditableField =
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'TEXTAREA' ||
      event.target.isContentEditable

    // Check for Ctrl+C or Cmd+C (Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      if (!isEditableField) {
        const selectedNode = flowStore.nodes.find(n => n.selected)
        if (selectedNode) {
          event.preventDefault()
          handleCopy()
        } else {
          // No node selected - flush copied node so it doesn't interfere with text paste
          copiedNode.value = null
        }
      }
    }

    // Check for Ctrl+V or Cmd+V (Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      // Only paste node if not in editable field and we have a copied node
      if (!isEditableField && copiedNode.value) {
        event.preventDefault()
        handlePaste()
      }
    }

    // Check for Ctrl+G or Cmd+G (Mac) - Group nodes
    if ((event.ctrlKey || event.metaKey) && event.key === 'g') {
      event.preventDefault()
      handleGroup()
    }
  }

  // Setup keyboard listeners
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {}
}
