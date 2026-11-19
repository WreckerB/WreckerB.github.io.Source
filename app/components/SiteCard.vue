<template>
  <article class="site-card">
    <div class="site-card-top">
      <a
        v-if="faviconUrl && !faviconBroken"
        class="site-icon-link"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="site.name"
        :aria-label="site.name"
      >
        <img
          class="site-favicon"
          :src="faviconUrl"
          alt=""
          width="48"
          height="48"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
          @error="faviconBroken = true"
        />
      </a>
      <a
        v-else
        class="site-icon-link site-badge"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="site.name"
      >{{ badgeText }}</a>

      <div class="site-meta">
        <h3 class="site-name">{{ site.name }}</h3>
        <p class="site-desc">{{ desc }}</p>
      </div>
    </div>

    <form v-if="site.search" class="site-search" @submit.prevent="onSubmit">
      <div v-if="site.search.options" ref="scopeEl" class="scope" @keydown.esc="scopeOpen = false">
        <button
          type="button"
          class="scope-trigger"
          :aria-expanded="scopeOpen"
          aria-haspopup="listbox"
          @click="scopeOpen = !scopeOpen"
        >
          {{ scopeLabel }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <ul v-if="scopeOpen" class="scope-menu" role="listbox">
          <li v-for="opt in site.search.options" :key="opt.value">
            <button
              type="button"
              class="scope-option"
              :class="{ 'is-active': opt.value === scope }"
              role="option"
              :aria-selected="opt.value === scope"
              @click="selectScope(opt.value)"
            >
              {{ t(opt.labelKey) }}
            </button>
          </li>
        </ul>
      </div>
      <input
        ref="inputEl"
        v-model="keyword"
        type="search"
        :placeholder="t('common.placeholder')"
        :aria-label="site.name"
      />
      <button type="submit" class="search-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>
        <span class="sr-only">{{ t('common.search') }}</span>
      </button>
    </form>

    <a v-else class="visit-btn" :href="site.url" target="_blank" rel="noopener noreferrer">
      {{ t('common.visit') }}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  </article>
</template>

<script setup lang="ts">
import type { Site } from '~/utils/sites'

const props = defineProps<{ site: Site }>()

const { t } = useI18n()

const keyword = ref('')
const scope = ref(props.site.search?.options?.[0]?.value ?? '')
const inputEl = ref<HTMLInputElement | null>(null)
/** 在线 favicon 加载失败时改用文字徽章 */
const faviconBroken = ref(false)

const scopeOpen = ref(false)
const scopeEl = ref<HTMLElement | null>(null)

const desc = computed(() => t(props.site.descKey))

const scopeLabel = computed(() => {
  const current = props.site.search?.options?.find(option => option.value === scope.value)
  return current ? t(current.labelKey) : ''
})

const selectScope = (value: string) => {
  scope.value = value
  scopeOpen.value = false
}

const onDocumentClick = (event: MouseEvent) => {
  if (scopeOpen.value && scopeEl.value && !scopeEl.value.contains(event.target as Node)) {
    scopeOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))

/** 在线 favicon：统一来源，HTTP/2 下可复用同一条连接 */
const faviconUrl = computed(() => {
  if (props.site.useFavicon === false) return ''
  try {
    return `https://favicon.im/${new URL(props.site.url).host}`
  } catch {
    return ''
  }
})

/** 文字徽章内容：站点名首字符 */
const badgeText = computed(() => props.site.name.trim().charAt(0).toUpperCase())

const onSubmit = () => {
  const build = props.site.search?.build
  if (!build) return
  const kw = keyword.value.trim()
  if (!kw) {
    inputEl.value?.focus()
    return
  }
  window.open(build(kw, scope.value), '_blank', 'noopener,noreferrer')
}
</script>
