export type ThemeMode = 'light' | 'dark' | 'auto'

const THEME_STORAGE_KEY = 'wrecker-theme'

/** 读取本地缓存的主题偏好 */
function readStoredMode(): ThemeMode | null {
  if (!import.meta.client) return null
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' || value === 'auto' ? value : null
  } catch {
    return null
  }
}

export function useTheme() {
  const mode = useState<ThemeMode>('theme-mode', () => 'auto')
  const isDark = useState<boolean>('theme-dark', () => false)

  function apply(dark: boolean) {
    isDark.value = dark
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }

  function resolve(next: ThemeMode) {
    if (next === 'auto') return window.matchMedia('(prefers-color-scheme: dark)').matches
    return next === 'dark'
  }

  /** 客户端挂载后同步真实主题（首屏闪烁已由 nuxt.config 的前置脚本兜底） */
  function init() {
    if (!import.meta.client) return
    mode.value = readStoredMode() ?? 'auto'
    apply(resolve(mode.value))

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', () => {
      if (mode.value === 'auto') apply(media.matches)
    })
  }

  /** 即时保存并应用主题 */
  function setMode(next: ThemeMode) {
    mode.value = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* 本地缓存不可用时仅当前会话生效 */
    }
    apply(resolve(next))
  }

  return { mode, isDark, init, setMode }
}
