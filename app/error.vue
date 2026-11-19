<template>
  <div class="error-page">
    <div class="error-card">
      <span class="error-code">{{ statusCode }}</span>
      <h1 class="error-title">{{ text.title }}</h1>
      <p class="error-desc">{{ text.desc }}</p>
      <NuxtLink :to="homePath" class="btn btn-primary error-home">
        {{ text.home }}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; url?: string } }>()

const messages = {
  'zh-CN': {
    home: '返回首页',
    notFound: { title: '页面走丢了', desc: '你访问的页面不存在，或已经搬家了。' },
    generic: { title: '出了点问题', desc: '页面暂时无法加载，请稍后重试或返回首页。' }
  },
  'en-US': {
    home: 'Back to home',
    notFound: { title: 'Page not found', desc: "The page you're looking for doesn't exist or has moved." },
    generic: { title: 'Something went wrong', desc: "This page couldn't be loaded. Please try again later or head back home." }
  }
} as const

// 错误页脱离了 [lang] 路由上下文，从错误 url 与当前请求路径两处推断语言，
// 任一命中 /en 前缀即为英文，覆盖服务端直连与客户端导航等不同 404 触发方式。
const isEn = computed(() => {
  const sources = [props.error?.url ?? '', useRequestURL().pathname]
  return sources.some(path => /^\/en(?:\/|$)/.test(path))
})

const text = computed(() => {
  const dict = isEn.value ? messages['en-US'] : messages['zh-CN']
  const status = statusCode.value === 404 ? dict.notFound : dict.generic
  return { home: dict.home, title: status.title, desc: status.desc }
})

const homePath = computed(() => (isEn.value ? '/en' : '/'))
const statusCode = computed(() => props.error?.statusCode ?? 404)

useHead(() => ({
  title: `${statusCode.value} · WreckerB`,
  htmlAttrs: { lang: isEn.value ? 'en-US' : 'zh-CN' }
}))
</script>
