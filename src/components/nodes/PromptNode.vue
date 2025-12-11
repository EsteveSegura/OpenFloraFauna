<template>
  <BaseNode
    :id="id"
    :type="type"
    :data="nodeData"
    :label="nodeData.label"
    :inputs="[]"
    :outputs="['prompt']"
    icon="📝"
    :selected="selected"
  >
    <div class="prompt-node-content">
      <textarea
        v-model="localPrompt"
        class="prompt-textarea"
        placeholder="Enter your prompt here..."
        rows="5"
        @blur="updatePrompt"
      ></textarea>

      <div v-if="nodeData.prompt" class="character-count">
        {{ nodeData.prompt.length }} characters
      </div>
    </div>
  </BaseNode>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useNode, useVueFlow } from '@vue-flow/core'
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
    default: () => ({})
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const localPrompt = ref(props.data.prompt || '')

// VueFlow composables
const { node } = useNode()
const { updateNodeData } = useVueFlow()

// Get the current node data from useNode composable
const nodeData = computed(() => node.data)

// Watch for external changes to prompt
watch(() => nodeData.value.prompt, (newPrompt) => {
  if (newPrompt !== localPrompt.value) {
    localPrompt.value = newPrompt
  }
})

function updatePrompt() {
  if (localPrompt.value !== nodeData.value.prompt) {
    updateNodeData(props.id, {
      prompt: localPrompt.value
    })
  }
}
</script>

<style scoped>
.prompt-node-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
}

.prompt-textarea {
  width: 100%;
  min-width: 250px;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.2s;
}

.prompt-textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.prompt-textarea::placeholder {
  color: #999;
}

.character-count {
  font-size: 0.75rem;
  color: #666;
  text-align: right;
}
</style>
