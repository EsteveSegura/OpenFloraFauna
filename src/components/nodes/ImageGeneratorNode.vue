<template>
  <BaseNode
    :id="id"
    :type="type"
    :data="data"
    :label="data.label"
    :inputs="['image']"
    :outputs="['image']"
    :loading="isGenerating"
    icon="✨"
    :selected="selected"
    @action:run="handleGenerate"
  >
    <div class="generator-node-content">
      <!-- Connected images thumbnails -->
      <div v-if="connectedImages.length > 0" class="connected-images">
        <div class="section-label">Input Images:</div>
        <div class="thumbnails-grid">
          <div
            v-for="(img, index) in connectedImages"
            :key="index"
            class="thumbnail"
          >
            <img :src="img.src" :alt="`Input ${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- Generated image preview -->
      <div v-if="data.lastOutputSrc" class="image-preview">
        <img :src="data.lastOutputSrc" :alt="data.label" />
      </div>
      <div v-else class="image-placeholder">
        <span class="placeholder-icon">✨</span>
        <p>{{ isGenerating ? 'Generating...' : 'No image generated' }}</p>
      </div>

      <!-- Prompt input -->
      <div class="prompt-section">
        <label for="prompt">Prompt:</label>
        <textarea
          id="prompt"
          v-model="localPrompt"
          placeholder="Describe the image you want to generate..."
          rows="3"
          @blur="updatePrompt"
        ></textarea>
      </div>

      <!-- Generate button -->
      <button
        class="generate-button"
        :disabled="isGenerating || !localPrompt.trim()"
        @click="handleGenerate"
      >
        {{ isGenerating ? 'Generating...' : 'Generate Image' }}
      </button>
    </div>
  </BaseNode>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFlowStore } from '@/stores/flow'
import BaseNode from '@/components/base/BaseNode.vue'

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
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const flowStore = useFlowStore()
const localPrompt = ref(props.data.prompt || '')
const isGenerating = ref(false)

// Get connected images from upstream nodes
const connectedImages = computed(() => {
  const connections = flowStore.getNodeConnections(props.id)
  const images = []

  connections.incoming.forEach(edge => {
    const sourceNode = flowStore.getNodeById(edge.source)
    if (sourceNode && sourceNode.data) {
      // Check if source has image data
      if (sourceNode.data.src) {
        images.push({
          src: sourceNode.data.src,
          name: sourceNode.data.name
        })
      } else if (sourceNode.data.lastOutputSrc) {
        images.push({
          src: sourceNode.data.lastOutputSrc,
          name: sourceNode.data.label
        })
      }
    }
  })

  return images
})

// Watch for external changes to prompt
watch(() => props.data.prompt, (newPrompt) => {
  if (newPrompt !== localPrompt.value) {
    localPrompt.value = newPrompt
  }
})

function updatePrompt() {
  if (localPrompt.value !== props.data.prompt) {
    flowStore.updateNodeData(props.id, {
      prompt: localPrompt.value
    })
  }
}

async function handleGenerate() {
  if (!localPrompt.value.trim() || isGenerating.value) return

  isGenerating.value = true

  try {
    // Update prompt before generating
    flowStore.updateNodeData(props.id, {
      prompt: localPrompt.value
    })

    // TODO: Replace with actual API call to Replicate
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // TODO: Replace with actual generated image
    // For now, use a placeholder
    const mockGeneratedImage = `https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Generated+${Date.now()}`

    flowStore.updateNodeData(props.id, {
      prompt: localPrompt.value,
      lastOutputSrc: mockGeneratedImage,
      model: 'mock-model-v1',
      params: {
        connectedImagesCount: connectedImages.value.length
      }
    })
  } catch (error) {
    console.error('Error generating image:', error)
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.generator-node-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 280px;
}

.connected-images {
  padding: 0.5rem;
  background: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #eee;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
}

.thumbnails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
}

.thumbnail {
  width: 100%;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview {
  width: 100%;
  height: 180px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #eee;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: 2px dashed #ddd;
  border-radius: 4px;
  color: #999;
}

.placeholder-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.image-placeholder p {
  margin: 0;
  font-size: 0.85rem;
}

.prompt-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.prompt-section label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #555;
}

.prompt-section textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.85rem;
  resize: vertical;
  transition: border-color 0.2s;
}

.prompt-section textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.generate-button {
  width: 100%;
  padding: 0.6rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s;
}

.generate-button:hover:not(:disabled) {
  background: #1976D2;
}

.generate-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
