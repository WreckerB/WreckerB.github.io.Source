<template>
  <ElConfigProvider :locale="elementLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import en from 'element-plus/es/locale/lang/en.mjs'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

const { locale } = useI18n()
const { init } = useTheme()

const elementLocale = computed(() => (locale.value === 'zh-CN' ? zhCn : en))

// 语言变化时同步 <html lang>
useHead(() => ({ htmlAttrs: { lang: locale.value } }))

onMounted(() => init())
</script>
