<template>
  <BaseModal
    v-model="isOpen"
    title="Settings"
    :show-header="true"
    :show-footer="false"
    size="md"
  >
    <div class="settings-content">
      <div class="settings-section">
        <h3 class="settings-section-title">Node Appearance</h3>
        <div class="settings-option">
          <BaseCheckbox
            id="show-node-headers"
            v-model="settingsStore.showNodeHeaders"
            label="Show node headers"
          />
          <p class="settings-option-description">
            Display node headers with icons and labels
          </p>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const settingsStore = useSettingsStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  gap: var(--flora-space-4);
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: var(--flora-space-3);
}

.settings-section-title {
  margin: 0;
  font-size: var(--flora-font-size-base);
  font-weight: var(--flora-font-weight-semibold);
  color: var(--flora-color-text-primary);
  padding-bottom: var(--flora-space-2);
  border-bottom: var(--flora-border-width-thin) solid var(--flora-color-border-default);
}

.settings-option {
  display: flex;
  flex-direction: column;
  gap: var(--flora-space-1);
}

.settings-option-description {
  margin: 0;
  font-size: var(--flora-font-size-xs);
  color: var(--flora-color-text-tertiary);
  padding-left: calc(18px + var(--flora-space-2));
}
</style>
