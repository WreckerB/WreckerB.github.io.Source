import type { LangParam } from '~/composables/useI18n'

/**
 * 语言完全由 URL 前缀决定：
 *   /      → 默认语言（中文，无前缀）
 *   /en    → 英文
 *
 * 非法前缀（如 /abc）直接 404，避免被 [lang] 动态段吞掉后
 * 渲染出一份和首页重复的内容。
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const raw = to.params.lang
  const value = Array.isArray(raw) ? raw[0] : raw

  if (value !== undefined && !supportedLangs.includes(value as LangParam)) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }

  // 客户端跳转到另一种语言时，语言包可能还没加载过
  await ensureLocaleLoaded(value === undefined ? defaultLocale : langToLocale[value as LangParam])
})
