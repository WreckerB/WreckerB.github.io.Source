<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink :to="localePath('/')" class="brand">
        <img src="/favicon.svg" alt="" class="brand-logo" width="28" height="28" />
        <span class="brand-name">{{ t('site.title') }}</span>
        <span class="brand-tagline">{{ t('site.tagline') }}</span>
      </NuxtLink>

      <nav class="nav" :aria-label="t('site.title')">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="localePath(item.path)"
          class="nav-link"
          active-class="is-active"
          exact-active-class="is-active"
        >
          {{ t(item.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <SettingsMenu />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t, localePath } = useI18n()

const navItems = [
  { path: '/', labelKey: 'nav.about' },
  { path: '/galgame', labelKey: 'nav.galgame' },
  { path: '/pillow', labelKey: 'nav.pillow' }
]
</script>
