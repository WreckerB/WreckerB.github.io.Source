<script setup lang="ts">
import type { Site } from '~/utils/sites'

const props = defineProps<{ site: Site }>()

const { t } = useI18n()

const keyword = ref('')
const scope = ref(props.site.search?.options?.[0]?.value ?? '')
const inputEl = ref<HTMLInputElement | null>(null)
/** 在线 favicon 加载失败时改用文字徽章 */
const faviconBroken = ref(false)

const desc = computed(() => t(props.site.descKey))

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

function onSubmit() {
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

<template>
  <article class="site-card">
    <div class="site-card-top">
      <img
        v-if="faviconUrl && !faviconBroken"
        class="site-favicon"
        :src="faviconUrl"
        :alt="site.name"
        width="44"
        height="44"
        loading="lazy"
        decoding="async"
        referrerpolicy="no-referrer"
        @error="faviconBroken = true"
      />
      <span v-else class="site-badge" :title="site.name">{{ badgeText }}</span>

      <div class="site-meta">
        <h3 class="site-name">{{ site.name }}</h3>
        <p class="site-desc">{{ desc }}</p>
      </div>
    </div>

    <form v-if="site.search" class="site-search" @submit.prevent="onSubmit">
      <select v-if="site.search.options" v-model="scope" :aria-label="t('common.search')">
        <option v-for="opt in site.search.options" :key="opt.value" :value="opt.value">
          {{ t(opt.labelKey) }}
        </option>
      </select>
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
