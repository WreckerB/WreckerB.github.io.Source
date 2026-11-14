/**
 * 在首屏渲染前加载当前语言包，
 * 服务端与客户端使用同一份数据，避免闪烁与 hydration 不一致。
 */
export default defineNuxtPlugin(async () => {
  const { locale, load } = useI18n()
  await load(locale.value)
})
