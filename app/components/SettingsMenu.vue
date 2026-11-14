<script setup lang="ts">
import type { LangParam, LocaleCode } from '~/composables/useI18n'
import { saveLangPref } from '~/composables/useI18n'
import type { ThemeMode } from '~/composables/useTheme'

const { t, locale, localeOptions, setLocale } = useI18n()
const { mode, setMode } = useTheme()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const themeOptions: { value: ThemeMode; labelKey: string }[] = [
  { value: 'auto', labelKey: 'settings.auto' },
  { value: 'light', labelKey: 'settings.light' },
  { value: 'dark', labelKey: 'settings.dark' }
]

function togglePanel() {
  open.value = !open.value
}

function selectLanguage(param: LangParam, code: LocaleCode) {
  saveLangPref(param)
  if (code !== locale.value) setLocale(code)
}

function onDocumentClick(event: MouseEvent) {
  if (open.value && root.value && !root.value.contains(event.target as Node)) {
    open.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="settings">
    <button
      type="button"
      class="icon-btn"
      :title="t('settings.title')"
      :aria-label="t('settings.title')"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="togglePanel"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9.1a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1z" />
      </svg>
    </button>

    <div v-if="open" class="settings-panel" role="dialog" :aria-label="t('settings.title')">
      <div class="settings-group">
        <span class="settings-label">{{ t('settings.language') }}</span>
        <div class="settings-options">
          <button
            v-for="option in localeOptions"
            :key="option.code"
            type="button"
            class="settings-option"
            :class="{ 'is-selected': option.code === locale }"
            @click="selectLanguage(option.param, option.code)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="settings-group">
        <span class="settings-label">{{ t('settings.theme') }}</span>
        <div class="settings-options settings-options-3">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            type="button"
            class="settings-option"
            :class="{ 'is-selected': mode === option.value }"
            @click="setMode(option.value)"
          >
            {{ t(option.labelKey) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
