import { escapeEucjp } from './eucjp'

export type SiteCategory = 'shop' | 'tool' | 'info'

export interface SearchOption {
  value: string
  /** 下拉项文案的 i18n key，见 locales/*.json 的 scopes 段 */
  labelKey: string
}

export interface SiteSearch {
  options?: SearchOption[]
  /** 根据关键词与所选分类拼出目标站点的检索链接 */
  build: (keyword: string, option: string) => string
}

export interface Site {
  id: string
  /** 站点名称（多为品牌原名，无需翻译） */
  name: string
  /** 站点主页，同时用于拼接在线 favicon 的域名 */
  url: string
  category: SiteCategory
  /** 站点简介的 i18n key，见 locales/*.json 的 sites 段 */
  descKey: string
  search?: SiteSearch
}

const enc = encodeURIComponent

/* ------------------------- 通贩站点 ------------------------- */
export const shopSites: Site[] = [
  {
    id: 'surugaya',
    name: '駿河屋',
    url: 'https://www.suruga-ya.jp',
    category: 'shop',
    descKey: 'sites.surugaya.desc',
    search: {
      options: [
        { value: 'global', labelKey: 'scopes.global' },
        { value: 'game', labelKey: 'scopes.game' },
        { value: 'doujin', labelKey: 'scopes.doujin' }
      ],
      build: (kw, option) => {
        const q = enc(kw)
        if (option === 'game') return `https://www.suruga-ya.jp/search?category=65204&search_word=${q}&inStock=On`
        if (option === 'doujin') return `https://www.suruga-ya.jp/search?category=1101&search_word=${q}&inStock=On`
        return `https://www.suruga-ya.jp/search?search_word=${q}&inStock=On`
      }
    }
  },
  {
    id: 'auctions',
    name: 'ヤフオク',
    url: 'https://auctions.yahoo.co.jp',
    category: 'shop',
    descKey: 'sites.auctions.desc',
    search: {
      options: [
        { value: 'global', labelKey: 'scopes.global' },
        { value: 'restricted', labelKey: 'scopes.restricted' }
      ],
      build: (kw, option) =>
        option === 'restricted'
          ? `https://auctions.yahoo.co.jp/search/search?auccat=26146&p=${enc(kw)}`
          : `https://auctions.yahoo.co.jp/search/search?p=${enc(kw)}`
    }
  },
  {
    id: 'amazon',
    name: 'Amazon',
    url: 'https://www.amazon.co.jp',
    category: 'shop',
    descKey: 'sites.amazon.desc',
    search: {
      options: [
        { value: 'global', labelKey: 'scopes.global' },
        { value: 'game', labelKey: 'scopes.game' }
      ],
      build: (kw, option) =>
        option === 'game'
          ? `https://www.amazon.co.jp/s?k=${enc(kw)}&i=software`
          : `https://www.amazon.co.jp/s?k=${enc(kw)}`
    }
  },
  {
    id: 'mandarake',
    name: 'まんだらけ',
    url: 'https://order.mandarake.co.jp/order',
    category: 'shop',
    descKey: 'sites.mandarake.desc',
    search: {
      options: [
        { value: 'global', labelKey: 'scopes.global' },
        { value: 'game', labelKey: 'scopes.game' },
        { value: 'doujin', labelKey: 'scopes.doujin' }
      ],
      build: (kw, option) => {
        const q = enc(kw)
        if (option === 'game')
          return `https://order.mandarake.co.jp/order/listPage/list?categoryCode=030114&keyword=${q}`
        if (option === 'doujin')
          return `https://order.mandarake.co.jp/order/listPage/list?categoryCode=03&keyword=${q}`
        return `https://order.mandarake.co.jp/order/listPage/list?keyword=${q}`
      }
    }
  },
  {
    id: 'hgame1',
    name: 'PCショップうの屋',
    url: 'https://www.hgame1.com/top.html',
    category: 'shop',
    descKey: 'sites.hgame1.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      build: kw => `https://www.hgame1.com/msearch/msearch.cgi?query=${enc(kw)}`
    }
  },
  {
    id: 'chuko-tsuhan',
    name: '秋葉原トレーダー',
    url: 'http://www.chuko-tsuhan.com',
    category: 'shop',
    descKey: 'sites.chuko-tsuhan.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      // 该站点只接受 EUC-JP 编码的检索词
      build: kw => `http://www.chuko-tsuhan.com/shop/shopbrand.html?search=${escapeEucjp(kw)}`
    }
  },
  {
    id: 'lashinbang',
    name: 'らしんばん',
    url: 'https://shop.lashinbang.com',
    category: 'shop',
    descKey: 'sites.lashinbang.desc',
    search: {
      options: [
        { value: 'global', labelKey: 'scopes.global' },
        { value: 'game', labelKey: 'scopes.game' }
      ],
      build: (kw, option) =>
        option === 'game'
          ? `https://shop.lashinbang.com/products/list?cat=ゲーム&keyword=${enc(kw)}&subcat=PCゲーム&stock=2`
          : `https://shop.lashinbang.com/products/list?keyword=${enc(kw)}&stock=2`
    }
  },
  {
    id: 'mercari',
    name: 'メルカリ',
    url: 'https://jp.mercari.com',
    category: 'shop',
    descKey: 'sites.mercari.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      build: kw => `https://jp.mercari.com/search?keyword=${enc(kw)}`
    }
  }
]

/* ------------------------- 工具站点 ------------------------- */
export const toolSites: Site[] = [
  {
    id: 'buyee',
    name: 'Buyee',
    url: 'https://buyee.jp',
    category: 'tool',
    descKey: 'sites.buyee.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      build: kw => `https://buyee.jp/item/crosssearch/query/${enc(kw)}`
    }
  },
  {
    id: 'erocate',
    name: 'EroLocate',
    url: 'https://erocate.com',
    category: 'tool',
    descKey: 'sites.erocate.desc'
  },
  {
    id: 'keepa',
    name: 'Keepa',
    url: 'https://keepa.com',
    category: 'tool',
    descKey: 'sites.keepa.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      build: kw => `https://keepa.com/#!product/5-${enc(kw)}`
    }
  }
]

/* ------------------------- 资料站点 ------------------------- */
export const infoSites: Site[] = [
  {
    id: 'playrack',
    name: 'Playrack',
    url: 'https://playrack.net/',
    category: 'info',
    descKey: 'sites.playrack.desc'
  },
  {
    id: 'erogamescape',
    name: 'ErogameScape',
    url: 'https://153.127.88.54/~ap2/ero/toukei_kaiseki/',
    category: 'info',
    descKey: 'sites.erogamescape.desc'
  },
  {
    id: 'vndb',
    name: 'VNDB',
    url: 'https://vndb.org/',
    category: 'info',
    descKey: 'sites.vndb.desc'
  },
  {
    id: 'getchu',
    name: 'Getchu',
    url: 'http://www.getchu.com/pc/',
    category: 'info',
    descKey: 'sites.getchu.desc'
  },
  {
    id: 'egono',
    name: 'Eroge RSS Checker',
    url: 'http://egono.com/',
    category: 'info',
    descKey: 'sites.egono.desc'
  },
  {
    id: 'wayback',
    name: 'Wayback Machine',
    url: 'https://web.archive.org/',
    category: 'info',
    descKey: 'sites.wayback.desc'
  }
]

/* ------------------------- 抱枕 ------------------------- */
export const pillowSites: Site[] = [
  {
    id: 'baozhen',
    name: '加拿大鹅抱枕研发中心',
    url: 'https://baozhen.jp/',
    category: 'info',
    descKey: 'sites.baozhen.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      build: kw => `https://www.baozhen.jp/search/results?keyword=${enc(kw)}`
    }
  },
  {
    id: 'omiai',
    name: 'おみあい！ 抱き枕カバー',
    url: 'http://omiai-dakimakura.com/',
    category: 'info',
    descKey: 'sites.omiai.desc',
    search: {
      options: [{ value: 'global', labelKey: 'scopes.global' }],
      build: kw => `http://omiai-dakimakura.com/?s=${enc(kw)}`
    }
  }
]
