<script setup lang="ts">
const { locale } = useI18n()
const { init } = useTheme()

// 语言变化时同步 <html lang>
useHead(() => ({ htmlAttrs: { lang: locale.value } }))

onMounted(() => init())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
