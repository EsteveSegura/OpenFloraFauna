<template>
  <BaseNode
    :id="id"
    :type="type"
    :data="nodeData"
    :label="nodeData.label"
    :inputs="['image', 'image']"
    :outputs="[]"
    icon="⚖️"
    :selected="selected"
  >
    <div class="compare-node-content">
      <!-- Status info -->
      <div v-if="!hasImage1 || !hasImage2" class="status-info">
        <div class="status-icon">⚖️</div>
        <p>Connect 2 images to compare</p>
        <div class="connection-status">
          <div :class="['status-dot', { active: hasImage1 }]"></div>
          <span>Image 1 (Left)</span>
        </div>
        <div class="connection-status">
          <div :class="['status-dot', { active: hasImage2 }]"></div>
          <span>Image 2 (Right)</span>
        </div>
      </div>

      <!-- Compare result -->
      <div v-else class="compare-result">
        <div
          ref="compareContainer"
          class="compare-preview"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        >
          <!-- Base image (right/after) -->
          <img :src="image2Src" alt="After" class="compare-image-full" />

          <!-- Overlay container with clipped image (left/before) -->
          <div class="compare-overlay" :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }">
            <img :src="image1Src" alt="Before" class="compare-image-full" />
          </div>

          <!-- Slider line and handle -->
          <div class="compare-divider" :style="{ left: sliderPosition + '%' }">
            <div class="compare-handle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </div>
          </div>

          <!-- Labels -->
          <div class="compare-label compare-label-left">Before</div>
          <div class="compare-label compare-label-right">After</div>
        </div>
        <div class="compare-info">
          <span class="info-label">Click and drag to compare</span>
        </div>
      </div>
    </div>
  </BaseNode>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useNode, useVueFlow } from '@vue-flow/core'
import { useFlowStore } from '@/stores/flow'
import BaseNode from '@/components/base/BaseNode.vue'

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Object, default: () => ({}) },
  selected: { type: Boolean, default: false }
})

const flowStore = useFlowStore()
const compareContainer = ref(null)
const sliderPosition = ref(50)
const isDragging = ref(false)

// VueFlow composables
const { node } = useNode()
const { viewport } = useVueFlow()

// Get the current node data from useNode composable
const nodeData = computed(() => node.data)

// Drag functionality
function handleMouseDown(event) {
  // Prevent node dragging
  event.stopPropagation()
  isDragging.value = true
  updatePosition(event)
}

function handleMouseMove(event) {
  if (!isDragging.value) return
  event.stopPropagation()
  updatePosition(event)
}

function handleMouseUp(event) {
  if (isDragging.value) {
    event.stopPropagation()
  }
  isDragging.value = false
}

function updatePosition(event) {
  if (!compareContainer.value) return

  const rect = compareContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = (x / rect.width) * 100

  // Clamp between 0 and 100
  sliderPosition.value = Math.max(0, Math.min(100, percentage))
}

// Get connected images from incoming edges
// Using flowStore directly for reactivity
const connectedImages = computed(() => {
  const incomingEdges = flowStore.edges.filter(edge => edge.target === props.id)

  return incomingEdges
    .map(edge => {
      const sourceNode = flowStore.nodes.find(n => n.id === edge.source)
      if (!sourceNode) return null

      // Get image from source node
      const imageSrc = sourceNode.data?.src || sourceNode.data?.lastOutputSrc
      if (!imageSrc) return null

      return {
        src: imageSrc,
        handle: edge.targetHandle,
        nodeId: edge.source
      }
    })
    .filter(img => img !== null)
})

const hasImage1 = computed(() => {
  return connectedImages.value.some(img => img.handle === 'input-0')
})

const hasImage2 = computed(() => {
  return connectedImages.value.some(img => img.handle === 'input-1')
})

const image1Src = computed(() => {
  const img = connectedImages.value.find(img => img.handle === 'input-0')
  return img ? img.src : null
})

const image2Src = computed(() => {
  const img = connectedImages.value.find(img => img.handle === 'input-1')
  return img ? img.src : null
})
</script>

<style scoped>
.compare-node-content {
  padding: 0.75rem;
  min-width: 450px;
}

.status-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 2px dashed #ddd;
}

.status-icon {
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
}

.status-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  width: 100%;
  padding: 0.25rem 0.5rem;
  background: white;
  border-radius: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  transition: background 0.3s;
}

.status-dot.active {
  background: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}

.compare-result {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.compare-preview {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16 / 9;
  min-height: 300px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #eee;
  background: #000;
  cursor: ew-resize;
  user-select: none;
}

.compare-image-full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.compare-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.compare-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #4CAF50;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: none;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
}

.compare-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: #4CAF50;
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.compare-handle svg {
  flex-shrink: 0;
}

.compare-label {
  position: absolute;
  top: 12px;
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 4px;
  z-index: 3;
  pointer-events: none;
  backdrop-filter: blur(4px);
}

.compare-label-left {
  left: 12px;
}

.compare-label-right {
  right: 12px;
}

.compare-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 0.85rem;
}

.info-label {
  font-weight: 500;
  color: #666;
}

.info-detail {
  color: #333;
  font-style: italic;
}
</style>
