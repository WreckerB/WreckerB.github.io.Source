export type LocaleCode = 'zh-CN' | 'en-US'
export type LangParam = 'zh' | 'en'

export interface LocaleOption {
  code: LocaleCode
  /** URL 前缀段。默认语言挂在根路径，不使用该段 */
  param: LangParam
  /** 完整名称，用于提示 */
  label: string
  /** 短名称，用于紧凑按钮 */
  short: string
}

export const localeOptions: [LocaleOption, ...LocaleOption[]] = [
  { code: 'zh-CN', param: 'zh', label: '中文', short: '中' },
  { code: 'en-US', param: 'en', label: 'English', short: 'EN' }
]

export const defaultLocale: LocaleCode = 'zh-CN'

/** URL 段 → 语言代码 */
export const langToLocale: Record<LangParam, LocaleCode> = {
  zh: 'zh-CN',
  en: 'en-US'
}

export const supportedLangs = Object.keys(langToLocale) as LangParam[]

type Dict = Record<string, any>

const localeLoaders: Record<LocaleCode, () => Promise<{ default: Dict }>> = {
  'zh-CN': () => import('~/utils/locales/zh-CN.json'),
  'en-US': () => import('~/utils/locales/en-US.json')
}

function messagesState() {
  return useState<Record<LocaleCode, Dict>>('i18n-messages', () => ({}) as any)
}

/** 按需加载语言包（各语言独立成 chunk，首屏只下载当前语言） */
export async function ensureLocaleLoaded(code: LocaleCode) {
  const messages = messagesState()
  if (messages.value[code]) return
  const mod = await localeLoaders[code]()
  messages.value[code] = mod.default
}

/** 从路由动态段读取语言；非法或缺省返回 null */
export function readLangParam(raw: unknown): LangParam | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  return value === 'zh' || value === 'en' ? value : null
}

const LANG_STORAGE_KEY = 'wrecker-lang'

/** 读取本地缓存的语言偏好 */
export function readSavedLang(): LangParam | null {
  if (!import.meta.client) return null
  try {
    const value = localStorage.getItem(LANG_STORAGE_KEY)
    return value === 'zh' || value === 'en' ? value : null
  } catch {
    return null
  }
}

/** 保存语言偏好到本地缓存 */
export function saveLangPref(param: LangParam) {
  if (!import.meta.client) return
  try {
    localStorage.setItem(LANG_STORAGE_KEY, param)
  } catch {
    /* 本地缓存不可用时仅当前会话生效 */
  }
}

export function useI18n() {
  const route = useRoute()
  const messages = messagesState()

  const lang = computed<LangParam | null>(() => readLangParam(route.params.lang))

  /** 语言完全由 URL 决定：/ 为默认语言，/en 为英文 */
  const locale = computed<LocaleCode>(() => (lang.value ? langToLocale[lang.value] : defaultLocale))

  /** 翻译：支持 'a.b.c' 路径与 {name} 占位符 */
  function t(key: string, params?: Record<string, string | number>): string {
    const dict = messages.value[locale.value]
    if (!dict) return key
    const value = key.split('.').reduce<any>((acc, part) => (acc == null ? acc : acc[part]), dict)
    if (typeof value !== 'string') return key
    if (!params) return value
    return value.replace(/\{(\w+)\}/g, (match, name) =>
      name in params ? String(params[name]) : match
    )
  }

  /**
   * 把站内绝对路径转换为目标语言的 URL。
   * 默认语言去掉语言前缀，其余语言补上前缀，保证每种语言只有一个规范地址。
   */
  function localePath(path: string, code: LocaleCode = locale.value): string {
    const bare = path.replace(/^\/(?:zh|en)(?=\/|$)/, '') || '/'
    if (code === defaultLocale) return bare
    const option = localeOptions.find(o => o.code === code)
    if (!option) return bare
    return bare === '/' ? `/${option.param}` : `/${option.param}${bare}`
  }

  /** 切换语言：先加载语言包再跳转，避免目标页短暂显示 key */
  async function setLocale(code: LocaleCode) {
    if (code === locale.value) return
    await ensureLocaleLoaded(code)
    await navigateTo(localePath(route.path, code))
  }

  return { locale, messages, t, load: ensureLocaleLoaded, setLocale, localePath, localeOptions }
}
