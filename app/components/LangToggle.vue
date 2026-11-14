<script setup lang="ts">
const { locale, setLocale, localeOptions } = useI18n()

const current = computed(() => localeOptions.find(o => o.code === locale.value) ?? localeOptions[0])
const next = computed(() => localeOptions.find(o => o.code !== locale.value) ?? localeOptions[0])

function switchLocale() {
  setLocale(next.value.code)
}
</script>

<template>
  <button
    type="button"
    class="icon-btn"
    :title="current.label"
    :aria-label="`Switch to ${next.label}`"
    @click="switchLocale"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
    <span>{{ current.short }}</span>
  </button>
</template>
