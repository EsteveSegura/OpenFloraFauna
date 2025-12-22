<template>
  <div class="alert-banner" :class="`alert-banner--${typeAlert}`">
    <div class="alert-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  typeAlert: {
    type: String,
    default: 'alert',
    validator: (value) => ['alert', 'info'].includes(value)
  }
})
</script>

<style scoped>
.alert-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--flora-space-3) var(--flora-space-4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', 'Arial', sans-serif;
}

.alert-banner--alert {
  background-color: var(--flora-color-danger);
  color: var(--flora-color-text-primary);
}

.alert-banner--info {
  background-color: var(--flora-color-info);
  color: var(--flora-color-text-primary);
}

.alert-content {
  font-size: var(--flora-font-size-sm);
  text-align: center;
}

.alert-content :deep(a) {
  color: var(--flora-color-text-primary);
  text-decoration: underline;
  font-weight: var(--flora-font-weight-medium);
}

.alert-content :deep(a:hover) {
  opacity: 0.9;
}
</style>
