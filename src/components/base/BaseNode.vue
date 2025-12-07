<template>
  <div
    class="base-node"
    :class="[
      `node-type-${type}`,
      {
        selected: isSelected,
        disabled: disabled,
        loading: loading,
        error: !!error
      }
    ]"
  >
    <!-- Input Handles -->
    <Handle
      v-for="(input, index) in inputs"
      :key="`input-${index}`"
      :id="`input-${index}`"
      type="target"
      :position="Position.Left"
      :style="{
        top: `${getHandlePosition(index, inputs.length)}%`,
        background: getPortColor(input)
      }"
    >
      <span class="handle-label handle-label-left">{{ input }}</span>
    </Handle>

    <!-- Output Handles -->
    <Handle
      v-for="(output, index) in outputs"
      :key="`output-${index}`"
      :id="`output-${index}`"
      type="source"
      :position="Position.Right"
      :style="{
        top: `${getHandlePosition(index, outputs.length)}%`,
        background: getPortColor(output)
      }"
    >
      <span class="handle-label handle-label-right">{{ output }}</span>
    </Handle>

    <!-- Header Slot -->
    <div class="node-header">
      <slot name="header">
        <span class="node-icon">{{ icon }}</span>
        <span class="node-label">{{ label }}</span>
      </slot>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Body/Content Slot -->
    <div class="node-content">
      <slot></slot>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="node-error">
      <span class="error-icon">⚠️</span>
      <span class="error-message">{{ error }}</span>
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="node-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  },
  label: {
    type: String,
    default: 'Node'
  },
  icon: {
    type: String,
    default: '⚙️'
  },
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  inputs: {
    type: Array,
    default: () => []
  },
  outputs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:data', 'action:run', 'action:upload'])

const isSelected = computed(() => props.selected)

/**
 * Calculate handle position for even distribution
 */
function getHandlePosition(index, total) {
  if (total === 1) return 50
  return ((index + 1) / (total + 1)) * 100
}

/**
 * Get color for port type
 */
function getPortColor(portType) {
  const colors = {
    image: '#4CAF50',
    text: '#2196F3',
    number: '#FF9800'
  }
  return colors[portType] || '#9E9E9E'
}
</script>

<style scoped>
.base-node {
  position: relative;
  min-width: 200px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.base-node.selected {
  border-color: #4CAF50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.base-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.base-node.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.base-node.error {
  border-color: #f44336;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
  border-radius: 6px 6px 0 0;
}

.node-icon {
  font-size: 1.2rem;
}

.node-label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.node-content {
  padding: 0.75rem;
}

.node-footer {
  padding: 0.5rem 0.75rem;
  background: #fafafa;
  border-top: 1px solid #eee;
  border-radius: 0 0 6px 6px;
  font-size: 0.85rem;
}

.node-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #ffebee;
  border-top: 1px solid #ffcdd2;
  color: #c62828;
  font-size: 0.85rem;
}

.error-icon {
  font-size: 1rem;
}

.error-message {
  flex: 1;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Handle Labels */
.handle-label {
  position: absolute;
  font-size: 0.7rem;
  color: #666;
  white-space: nowrap;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.95);
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.handle-label-left {
  right: 20px;
  transform: translateY(-50%);
}

.handle-label-right {
  left: 20px;
  transform: translateY(-50%);
}
</style>
