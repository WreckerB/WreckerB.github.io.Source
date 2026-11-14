export type ThemeMode = 'light' | 'dark'

const THEME_COOKIE = 'wrecker-theme'

export function useTheme() {
  // null 表示"跟随系统"，此时不写 Cookie
  const mode = useCookie<ThemeMode | null>(THEME_COOKIE, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/'
  })

  const isDark = useState<boolean>('theme-dark', () => false)

  function apply(dark: boolean) {
    isDark.value = dark
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }

  /** 客户端挂载后同步真实主题（首屏闪烁已由 nuxt.config 的前置脚本兜底） */
  function init() {
    if (!import.meta.client) return
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(mode.value ? mode.value === 'dark' : prefersDark)
  }

  function toggle() {
    const next = !isDark.value
    mode.value = next ? 'dark' : 'light'
    apply(next)
  }

  return { mode, isDark, init, toggle }
}
