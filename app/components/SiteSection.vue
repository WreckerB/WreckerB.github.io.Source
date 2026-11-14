<script setup lang="ts">
import type { Site } from '~/utils/sites'

defineProps<{
  /** 区块锚点，分享链接带 #anchorId 可直接定位到该区块 */
  anchorId: string
  /** 区块标题的 i18n key */
  titleKey: string
  /** 区块简介的 i18n key */
  descKey?: string
  sites: Site[]
}>()

const { t } = useI18n()
</script>

<template>
  <section :id="anchorId" class="section">
    <div class="section-head">
      <h2 class="section-title">
        {{ t(titleKey) }}
        <a :href="`#${anchorId}`" class="anchor-link" :aria-label="t('common.anchor')">#</a>
      </h2>
      <span v-if="descKey" class="section-desc">{{ t(descKey) }}</span>
      <span class="section-count">{{ t('common.count', { n: sites.length }) }}</span>
    </div>

    <div class="grid">
      <SiteCard v-for="site in sites" :key="site.id" :site="site" />
    </div>
  </section>
</template>
