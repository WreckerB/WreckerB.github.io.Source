<script setup lang="ts">
import { pillowSites } from '~/utils/sites'

const { t } = useI18n()

useHead(() => ({ title: `${t('pages.pillow.title')} · ${t('site.title')}` }))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-title">{{ t('pages.pillow.title') }}</h1>
      <p class="page-subtitle">{{ t('pages.pillow.subtitle') }}</p>
    </div>

    <SiteSection anchor-id="info" title-key="sections.info.title" desc-key="sections.info.desc" :sites="pillowSites" />
  </div>
</template>
