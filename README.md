# WreckerB

> 面向 Galgame 玩家的轻量导航站 —— 通贩站点、工具站点、资料站点，一页直达。

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org)

| | |
|---|---|
| 在线地址 | <https://wreckerb.github.io/> |
| 源码仓库 | <https://github.com/WreckerB/WreckerB.github.io.Source> |
| 产物仓库 | <https://github.com/WreckerB/WreckerB.github.io> |

---

## 这是什么

一个**纯静态、公开访问、无需登录**的 Galgame 资源导航页。把找游戏需要的通贩店铺、代购比价工具、评分资料库收拢到三个页面里，点开就走。

- **关于** `/` —— 项目介绍与站点导航（默认落地页）
- **旮旯** `/galgame` —— 通贩站点（8）、工具站点（3）、资料站点（6），共 17 个站点
- **抱枕** `/pillow` —— 抱枕套图库与相关资源

英文版挂在 `/en` 前缀下（`/en`、`/en/galgame`、`/en/pillow`），与中文版一一对应。

## 设计目标

| 目标 | 做法 |
|---|---|
| 极致轻量 | 运行时依赖只有 `nuxt` / `vue` / `vue-router` 三个。**没有** UI 组件库、没有 `@nuxtjs/i18n`、没有状态库、没有图标库、没有 UI 框架。所有交互由原生 CSS 与 Vue 能力实现。 |
| 访问速度快 | 全站 JS 约 99 KB（gzip），CSS 约 5 KB（gzip）。静态预渲染，无运行时 API 请求。图片懒加载。 |
| 移动端适配 | 纯 CSS 媒体查询，断点 900px / 720px / 420px。375px 视口下已实测无横向滚动。 |
| 中英双语 | 自研轻量 i18n，**语言由 URL 决定**：默认语言挂在根路径，英文挂在 `/en`。每种语言各自预渲染成独立 HTML，首屏即是正确语言，无闪烁、可被索引。语言包按需加载为独立 chunk。 |
| 暗色模式 | CSS 变量 + `html.dark`。首屏前置脚本在绘制前定色，**无闪烁**；图标切换纯 CSS，不抖动。 |

## 技术栈

Nuxt 4（SSR / 预渲染）、Vue 3、TypeScript、原生 CSS。**运行时第三方依赖：0 个。**

包管理器使用 **pnpm**，锁文件为 `pnpm-lock.yaml`（务必提交）。CI 用 `pnpm install --frozen-lockfile`，本地改依赖后记得把锁文件一起提交，否则 CI 会因锁文件过期而失败。

## 目录结构

```
.
├── app/
│   ├── app.vue                  # html[lang] 同步、主题初始化
│   ├── layouts/default.vue      # 顶栏 + 内容 + 页脚
│   ├── pages/
│   │   ├── index.vue            # 关于（默认落地页，中文）
│   │   ├── galgame.vue          # 旮旯
│   │   ├── pillow.vue           # 抱枕
│   │   └── [lang]/              # 语言前缀路由，复用同一批 View
│   │       ├── index.vue
│   │       ├── galgame.vue
│   │       └── pillow.vue
│   ├── views/                   # 页面真正的内容，被上面两组 pages 复用
│   │   ├── AboutView.vue
│   │   ├── GalgameView.vue
│   │   └── PillowView.vue
│   ├── middleware/
│   │   └── locale.global.ts     # 校验语言前缀，非法值 404
│   ├── components/
│   │   ├── AppHeader.vue        # 顶部导航栏
│   │   ├── AppFooter.vue
│   │   ├── LangToggle.vue       # 语言切换
│   │   ├── ThemeToggle.vue      # 明暗切换
│   │   ├── SiteCard.vue         # 站点卡片：logo + 标题 + 输入框
│   │   └── SiteSection.vue      # 分组标题 + 卡片网格
│   ├── composables/
│   │   ├── useI18n.ts           # 轻量 i18n
│   │   └── useTheme.ts          # 明暗主题
│   ├── utils/
│   │   ├── sites.ts             # ★ 站点数据（增删站点改这里）
│   │   ├── eucjp.ts             # EUC-JP 编码（秋葉原トレーダー 用）
│   │   └── locales/
│   │       ├── zh-CN.json       # ★ 中文文案
│   │       └── en-US.json       # ★ 英文文案
│   └── assets/css/main.css      # 全局样式与设计令牌
├── public/
│   ├── logo.svg / favicon.svg   # 本站品牌图标
│   └── .nojekyll                # 必需：避免 Jekyll 忽略 _nuxt 目录
└── .github/workflows/deploy.yml # 自动构建并推送产物
```

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

| 命令 | 说明 |
|---|---|
| `pnpm dev` | 开发服务器 |
| `pnpm build` | 构建 SSR 版本 |
| `pnpm generate` | 生成静态站点到 `.output/public`（部署用） |
| `pnpm preview` | 预览生产构建 |
| `pnpm typecheck` | vue-tsc 类型检查 |

> **环境要求**：Node `^22.19.0 || ^24.11.0 || >=26.0.0`，pnpm `10.13.1`（版本由 `package.json` 的 `packageManager` 字段锁定，CI 与本地一致）。

## 部署

采用**双仓库**方案：

- **源码仓库** `WreckerB/WreckerB.github.io.Source` —— 本项目代码
- **产物仓库** `WreckerB/WreckerB.github.io` —— 构建后的静态文件，GitHub Pages 从这里发布

### 一次性配置

1. 在源码仓库添加 Secret `PAGES_DEPLOY_TOKEN`：
   创建 classic PAT，勾选 `repo`（或对 `WreckerB/WreckerB.github.io` 有 Contents: write 权限）。
2. 在产物仓库 `WreckerB/WreckerB.github.io` 设置 **Settings → Pages → Source → Deploy from a branch**，选 `main` 分支、根目录 `/`。
3. 把源码推送到 `main` 分支即可。

之后每次推送 `main`，[`deploy.yml`](.github/workflows/deploy.yml) 会自动：类型检查 → 构建 → 清空产物仓库旧文件 → 提交新产物 → 推送。

### 部署到子路径

若以后改为部署在 `https://wreckerb.github.io/WreckerB/` 这样的子路径，构建时设置环境变量即可，无需改代码：

```bash
NUXT_APP_BASE_URL=/WreckerB/ pnpm generate
```

## 维护指南

### 新增一个站点

站点图标是**在线获取**的（`https://favicon.im/{域名}`），不需要准备任何图片文件。

1. 在 [`app/utils/sites.ts`](app/utils/sites.ts) 追加一条记录：

```ts
{
  id: 'example',
  name: 'Example Store',
  url: 'https://example.com',
  category: 'shop',
  descKey: 'sites.example.desc',
  search: {
    options: [{ value: 'global', labelKey: 'scopes.global' }],
    build: kw => `https://example.com/search?q=${encodeURIComponent(kw)}`
  }
}
```

2. 在 `zh-CN.json` 与 `en-US.json` 的 `sites` 段各加一条 `sites.example.desc`
3. 需要归入哪个分组，在 [`app/pages/galgame.vue`](app/pages/galgame.vue) 里挂到对应的 `SiteSection`

> 如果目标站本身没有 favicon（favicon.im 只会返回灰色占位图），
> 给这条记录加上 `useFavicon: false`，卡片会改用首字母文字徽章。

### 修改文案

所有文案在 `app/utils/locales/{zh-CN,en-US}.json`。两个文件的 key 必须保持一致。`{name}` 是占位符，用 `t('common.count', { n: 12 })` 传入。

### 新增一种语言

语言由 URL 前缀决定，新增语言要动三处：

1. `app/composables/useI18n.ts`：在 `localeOptions` 与 `langToLocale` 里加一条（如 `ja` → `ja-JP`）
2. 新建 `app/utils/locales/ja-JP.json`，并加进 `localeLoaders`
3. `app/pages/[lang]/` 已按动态段匹配，无需新增页面文件；但要把它加进 `nuxt.config.ts` 的 `prerender.routes`（如 `/ja`、`/ja/galgame`、`/ja/pillow`）

站内链接一律用 `localePath('/galgame')` 生成，不要手写带语言前缀的路径。

### 主题

颜色一律走 `app/assets/css/main.css` 顶部的 CSS 变量，明暗两套定义在 `:root` 和 `html.dark` 下，新增样式不要写死颜色。

## 站点图标说明

卡片上的站点图标**不存本地**，全部在线加载：

- 来源：`https://favicon.im/{站点域名}`，由 [favicon.im](https://favicon.im) 代理抓取目标站的 favicon 并缓存
- 全部图标同源，浏览器复用同一条 HTTP/2 连接；`nuxt.config.ts` 里加了 `preconnect` 提前建连
- 加载失败时自动回退为首字母文字徽章
- 少数站点本身没有 favicon 或只有 16×16，在 [`app/utils/sites.ts`](app/utils/sites.ts) 中标记 `useFavicon: false` 走文字徽章

各站点 favicon 的版权归原权利人所有，此处仅用于标识对应站点。

## License

MIT
