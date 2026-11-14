<script setup lang="ts">
const { t, localePath } = useI18n()
const config = useRuntimeConfig()

useHead(() => ({ title: `${t('pages.about.title')} · ${t('site.title')}` }))

const navCards = [
  { path: '/galgame', titleKey: 'pages.galgame.title', descKey: 'pages.galgame.subtitle' },
  { path: '/pillow', titleKey: 'pages.pillow.title', descKey: 'pages.pillow.subtitle' }
]

const points = ['about.intro.point1', 'about.intro.point2', 'about.intro.point3']
</script>

<template>
  <div>
    <section class="hero">
      <h1 class="hero-title">{{ t('about.hero.title') }}</h1>
      <p class="hero-lead">{{ t('about.hero.lead') }}</p>
      <div class="hero-actions">
        <NuxtLink :to="localePath('/galgame')" class="btn btn-primary">
          {{ t('about.hero.cta') }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </NuxtLink>
        <a
          class="btn btn-ghost"
          href="https://github.com/WreckerB/WreckerB.github.io.Source"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('about.info.source') }} ↗
        </a>
      </div>
    </section>

    <section class="card about-card">
      <h2 class="about-card-title">{{ t('about.intro.title') }}</h2>
      <p class="about-body">{{ t('about.intro.body') }}</p>
      <ul class="point-list">
        <li v-for="point in points" :key="point">{{ t(point) }}</li>
      </ul>
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">{{ t('about.nav.title') }}</h2>
        <span class="section-desc">{{ t('about.nav.desc') }}</span>
      </div>
      <div class="link-cards">
        <NuxtLink v-for="card in navCards" :key="card.path" :to="localePath(card.path)" class="link-card">
          <h3 class="link-card-title">{{ t(card.titleKey) }}</h3>
          <p class="link-card-desc">{{ t(card.descKey) }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="card about-card">
      <h2 class="about-card-title">{{ t('about.info.title') }}</h2>
      <dl class="info-grid">
        <div class="info-item">
          <dt>{{ t('about.info.version') }}</dt>
          <dd><span class="badge">{{ config.public.version }}</span></dd>
        </div>
        <div class="info-item">
          <dt>{{ t('about.info.buildTime') }}</dt>
          <dd>{{ config.public.buildTime }}</dd>
        </div>
        <div class="info-item">
          <dt>{{ t('about.info.stack') }}</dt>
          <dd>Nuxt 4 · Vue 3 · 原生 CSS</dd>
        </div>
        <div class="info-item">
          <dt>{{ t('about.info.source') }}</dt>
          <dd>
            <a href="https://github.com/WreckerB/WreckerB.github.io.Source" target="_blank" rel="noopener noreferrer">
              github.com/wreckerb/WreckerB ↗
            </a>
          </dd>
        </div>
        <div class="info-item">
          <dt>{{ t('about.info.preview') }}</dt>
          <dd>
            <a href="https://wreckerb.github.io/" target="_blank" rel="noopener noreferrer">
              wreckerb.github.io ↗
            </a>
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
