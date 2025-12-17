<template>
  <aside class="sidebar">
    <h3>Nodes</h3>
    <div
      v-for="nodeDef in nodes"
      :key="nodeDef.type"
      class="node-item"
      draggable="true"
      @dragstart="emit('drag-start', $event, nodeDef.type)"
      @click="emit('node-click', nodeDef.type)"
    >
      {{ getNodeIcon(nodeDef.type) }} {{ nodeDef.label }}
    </div>
  </aside>
</template>

<script setup>
import { NODE_TYPES } from '@/lib/node-shapes'

defineProps({
  nodes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['drag-start', 'node-click'])

function getNodeIcon(type) {
  const icons = {
    [NODE_TYPES.IMAGE]: '📷',
    [NODE_TYPES.IMAGE_GENERATOR]: '✨',
    [NODE_TYPES.PROMPT]: '📝',
    [NODE_TYPES.DIFF]: '🔍',
    [NODE_TYPES.COMPARE]: '⚖️',
    [NODE_TYPES.TEXT_GENERATOR]: '💬'
  }
  return icons[type] || '⚙️'
}
</script>

<style scoped>
.sidebar {
  position: absolute;
  top: 50%;
  left: 96px;
  transform: translateY(-50%);
  width: 200px;
  max-height: calc(100vh - 40px);
  background: var(--flora-color-surface);
  border: 1px solid var(--flora-color-border-default);
  border-radius: 12px;
  padding: 16px;
  z-index: 9;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar h3 {
  margin: 0 0 12px 0;
  font-size: var(--flora-font-size-md);
  font-weight: var(--flora-font-weight-semibold);
  color: var(--flora-color-text-primary);
}

.node-item {
  padding: 10px;
  margin-bottom: 8px;
  background: var(--flora-color-bg-secondary);
  border: 1px solid var(--flora-color-border-default);
  border-radius: 8px;
  cursor: grab;
  transition: all var(--flora-transition-fast);
  font-size: var(--flora-font-size-sm);
  color: var(--flora-color-text-primary);
}

.node-item:hover {
  background: var(--flora-color-surface-hover);
  border-color: var(--flora-color-accent);
  transform: translateX(2px);
}

.node-item:active {
  cursor: grabbing;
}
</style>
