<template>
  <div>
    <div class="page-head">
      <h1 class="page-title">{{ t('pages.galgame.title') }}</h1>
      <p class="page-subtitle">{{ t('pages.galgame.subtitle') }}</p>
    </div>

    <SiteSection anchor-id="shop" title-key="sections.shop.title" desc-key="sections.shop.desc" :sites="shopSites" />
    <SiteSection anchor-id="tool" title-key="sections.tool.title" desc-key="sections.tool.desc" :sites="toolSites" />
    <SiteSection anchor-id="info" title-key="sections.info.title" desc-key="sections.info.desc" :sites="infoSites" />
  </div>
</template>

<script setup lang="ts">
import { shopSites, toolSites, infoSites } from '~/utils/sites'

const { t } = useI18n()

useHead(() => ({ title: `${t('pages.galgame.title')} · ${t('site.title')}` }))
</script>
