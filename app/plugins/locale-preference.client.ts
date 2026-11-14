import { readLangParam, readSavedLang } from '~/composables/useI18n'

/**
 * 读取本地缓存的语言偏好：
 * 访问不带语言前缀的地址时自动切到保存的语言，
 * 带 /en 等前缀的链接保持访问者的明确选择。
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { localePath } = useI18n()

  nuxtApp.hook('app:mounted', () => {
    const saved = readSavedLang()
    if (!saved || saved === 'zh') return

    const route = nuxtApp.$router.currentRoute.value
    if (readLangParam(route.params.lang)) return

    navigateTo(localePath(route.path, 'en-US'), { replace: true })
  })
})
