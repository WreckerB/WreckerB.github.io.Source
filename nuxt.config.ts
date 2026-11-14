import pkg from './package.json'

// 部署到子路径（如 https://user.github.io/WreckerB/）时，用 NUXT_APP_BASE_URL=/WreckerB/ 覆盖
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  // 关闭 Nuxt 内置实验特性与遥测，保持最简
  telemetry: false,

  css: ['~/assets/css/main.css'],

  app: {
    baseURL,
    head: {
      title: 'WreckerB',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#6d4aff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0d1017', media: '(prefers-color-scheme: dark)' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // 站点 favicon 统一来自该域名，提前建连可省掉 TLS 握手
        { rel: 'preconnect', href: 'https://favicon.im', crossorigin: '' }
      ],
      script: [
        {
          // 首屏前置执行：在样式生效前决定明暗，避免主题闪烁
          innerHTML:
            "(function(){try{var c=document.cookie.match(/(?:^|;\\s*)wrecker-theme=([^;]+)/);" +
            "var t=c?decodeURIComponent(c[1]):null;" +
            "var d=t==='dark'||((!t)&&window.matchMedia('(prefers-color-scheme: dark)').matches);" +
            "document.documentElement.classList.toggle('dark',d);" +
            "document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})()",
          tagPosition: 'head'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      version: pkg.version,
      buildTime: new Date().toISOString()
    }
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      // 站内链接只指向「规范地址」（中文不带前缀、英文带 /en），
      // /zh 这类显式前缀不会被爬到，需显式列出以免线上 404
      routes: [
        '/',
        '/galgame',
        '/pillow',
        '/en',
        '/en/galgame',
        '/en/pillow',
        '/zh',
        '/zh/galgame',
        '/zh/pillow'
      ]
    }
  },

  experimental: {
    payloadExtraction: true
  }
})
