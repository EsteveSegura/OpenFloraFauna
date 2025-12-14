<template>
  <div class="group-node">
    <div
      ref="labelDiv"
      class="group-label"
      contenteditable="true"
      @mousedown.stop
      @click.stop
      @blur="updateLabel"
      @keydown.enter.prevent="blurOnEnter"
    >
      {{ data.label || 'Group' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Object, default: () => ({}) },
  selected: { type: Boolean, default: false }
})

const labelDiv = ref(null)

function updateLabel(event) {
  const newLabel = event.target.textContent.trim()
  props.data.label = newLabel || 'Group'
}

function blurOnEnter(event) {
  event.target.blur()
}
</script>

<style scoped>
.group-node {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: relative;
}

.group-label {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  background-color: rgba(128, 128, 128, 0.9);
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  pointer-events: auto;
  min-width: 120px;
  outline: none;
}

.group-label:focus {
  background-color: rgba(128, 128, 128, 1);
  box-shadow: 0 0 0 2px rgba(128, 128, 128, 0.7);
}

.group-label::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>
