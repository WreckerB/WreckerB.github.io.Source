<template>
  <article class="site-card">
    <div class="site-card-top">
      <a
        class="site-icon-link"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="site.name"
        :aria-label="site.name"
      >
        <span v-if="faviconFailed" class="site-badge">{{ badgeText }}</span>
        <template v-else>
          <img
            ref="faviconEl"
            class="site-favicon"
            :class="{ 'is-loading': faviconLoading }"
            :src="faviconUrl"
            alt=""
            width="48"
            height="48"
            decoding="async"
            referrerpolicy="no-referrer"
            @load="onFaviconLoad"
            @error="onFaviconError"
          />
          <span v-if="faviconLoading" class="site-favicon-placeholder" aria-hidden="true">
            <span class="site-favicon-spinner"></span>
          </span>
        </template>
      </a>

      <div class="site-meta">
        <h3 class="site-name">{{ site.name }}</h3>
        <p class="site-desc">{{ desc }}</p>
      </div>
    </div>

    <form v-if="site.search" class="site-search" @submit.prevent="onSubmit">
      <el-select
        v-if="site.search.options"
        v-model="scope"
        class="scope-select"
        :aria-label="t('common.scope')"
      >
        <el-option
          v-for="opt in site.search.options"
          :key="opt.value"
          :label="t(opt.labelKey)"
          :value="opt.value"
        />
      </el-select>
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
const faviconEl = ref<HTMLImageElement | null>(null)

/** favicon 状态：loading 空白占位 → loaded 在线图标 / failed 首字母徽章 */
const faviconState = ref<'loading' | 'loaded' | 'failed'>('loading')
const faviconLoading = computed(() => faviconState.value === 'loading')
const faviconLoaded = computed(() => faviconState.value === 'loaded')
const faviconFailed = computed(() => faviconState.value === 'failed')

const desc = computed(() => t(props.site.descKey))

/** 在线 favicon：统一来源；无图标时返回 404 以触发 @error 回退首字母徽章 */
const faviconUrl = computed(() => {
  try {
    return `https://favicon.im/${new URL(props.site.url).host}?throw-error-on-404=true`
  } catch {
    return ''
  }
})

/** 5s 内仍未拿到在线图标则回退到首字母徽章 */
let faviconTimer: ReturnType<typeof setTimeout> | undefined
onMounted(() => {
  const img = faviconEl.value
  // SSR 下图片可能在 hydration 前就完成/失败，@load 与 @error 事件会丢失，这里兜底判断
  if (img?.complete) {
    faviconState.value = img.naturalWidth > 0 ? 'loaded' : 'failed'
    return
  }
  faviconTimer = setTimeout(() => {
    if (faviconState.value === 'loading') faviconState.value = 'failed'
  }, 5000)
})
onBeforeUnmount(() => {
  if (faviconTimer) clearTimeout(faviconTimer)
})

const onFaviconLoad = () => {
  if (faviconTimer) clearTimeout(faviconTimer)
  faviconState.value = 'loaded'
}

const onFaviconError = () => {
  if (faviconTimer) clearTimeout(faviconTimer)
  faviconState.value = 'failed'
}

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
