<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <span>© {{ year }} {{ t('site.title') }}</span>
      <span>{{ t('footer.slogan') }}</span>
      <a class="footer-sep" href="https://github.com/WreckerB/WreckerB.github.io.Source" target="_blank" rel="noopener noreferrer">
        {{ t('footer.source') }} ↗
      </a>
    </div>
  </footer>
</template>
