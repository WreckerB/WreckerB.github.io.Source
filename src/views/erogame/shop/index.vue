<template>
  <div>
    <n-grid cols="s:1 m:2 l:3" responsive="screen" :x-gap="16" :y-gap="16">
      <n-grid-item v-for="item in cardData" :key="item.id">
        <n-card :bordered="false" hoverable class="h-full rounded-8px shadow-sm">
          <template #cover>
            <img :src="item.cover" class="h-100px object-contain cursor-pointer p-16px" @click="jump(item.id)" />
          </template>
          <div class="h-120px p-16px rounded-8px">
            <div class="flex flex-justify-center flex-items-center h-32px">
              <n-avatar :size="24" :src="item.icon" :style="{ backgroundColor: 'rgba(0,0,0,0)' }" />
              <h3 class="ml-16px text-18px">{{ item.title }}</h3>
            </div>
            <div class="flex flex-items-end h-56px">
              <n-input-group>
                <n-select
                  class="w-80px"
                  :default-value="item.options[0].label"
                  :options="item.options"
                  @click="setIndex(item.id)"
                  @update:value="setType"
                />
                <n-input v-model:value="item.value" :style="{ width: 'calc(100% - 130px)' }" clearable />
                <n-button class="w-50px border-rd-lg" type="primary" @click="search(item.id)">
                  <template #icon>
                    <svg-icon icon="material-symbols:search-rounded" />
                  </template>
                </n-button>
              </n-input-group>
            </div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EscapeEUCJP } from '@/utils/common/eucjp';

const currentIndex = ref();
const cardData = ref([
  {
    id: 'surugaya',
    cover: new URL('/src/assets/svg-icon/surugaya-logo.svg', import.meta.url).href,
    title: '駿河屋',
    icon: new URL('/src/assets/png/surugaya-icon.png', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      },
      {
        label: '本体',
        value: 'game'
      },
      {
        label: '同人',
        value: 'doujin'
      }
    ],
    value: ''
  },
  {
    id: 'auctions',
    cover: new URL('/src/assets/png/auctions-logo.png', import.meta.url).href,
    title: 'ヤフオク',
    icon: new URL('/src/assets/ico/auctions-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      },
      {
        label: '里区',
        value: 'restricted'
      }
    ],
    value: ''
  },
  {
    id: 'amazon',
    cover: new URL('/src/assets/svg-icon/amazon-logo.svg', import.meta.url).href,
    title: 'Amazon',
    icon: new URL('/src/assets/ico/amazon-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      },
      {
        label: '本体',
        value: 'game'
      }
    ],
    value: ''
  },
  {
    id: 'mandarake',
    cover: new URL('/src/assets/png/mandarake-logo.png', import.meta.url).href,
    title: 'まんだらけ',
    icon: new URL('/src/assets/ico/mandarake-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      },
      {
        label: '本体',
        value: 'game'
      },
      {
        label: '同人',
        value: 'doujin'
      }
    ],
    value: ''
  },
  {
    id: 'hgame1',
    cover: new URL('/src/assets/gif/hgame1-logo.gif', import.meta.url).href,
    title: 'PCショップうの屋',
    icon: new URL('/src/assets/ico/hgame1-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      }
    ],
    value: ''
  },
  {
    id: 'chuko-tsuhan',
    cover: new URL('/src/assets/gif/chuko-tsuhan-logo.gif', import.meta.url).href,
    title: '秋葉原トレーダー',
    icon: new URL('/src/assets/ico/chuko-tsuhan-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      }
    ],
    value: ''
  },
  {
    id: 'lashinbang',
    cover: new URL('/src/assets/png/lashinbang-logo.png', import.meta.url).href,
    title: 'らしんばん',
    icon: new URL('/src/assets/ico/lashinbang-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      },
      {
        label: '本体',
        value: 'game'
      }
    ],
    value: ''
  },
  {
    id: 'mercari',
    cover: new URL('/src/assets/svg-icon/mercari-logo.svg', import.meta.url).href,
    title: 'メルカリ',
    icon: new URL('/src/assets/ico/mercari-icon.ico', import.meta.url).href,
    type: 'global',
    options: [
      {
        label: '全局',
        value: 'global'
      }
    ],
    value: ''
  }
]);

const jump = (e: string) => {
  switch (e) {
    case 'surugaya':
      window.open('https://www.suruga-ya.jp');
      break;
    case 'auctions':
      window.open('https://auctions.yahoo.co.jp');
      break;
    case 'amazon':
      window.open('https://www.amazon.co.jp');
      break;
    case 'mandarake':
      window.open('https://order.mandarake.co.jp/order');
      break;
    case 'hgame1':
      window.open('https://www.hgame1.com/top.html');
      break;
    case 'chuko-tsuhan':
      window.open('http://www.chuko-tsuhan.com');
      break;
    case 'lashinbang':
      window.open('https://shop.lashinbang.com');
      break;
    case 'mercari':
      window.open('https://jp.mercari.com');
      break;
    default:
      break;
  }
};

const setIndex = (e: string) => {
  const index = cardData.value.findIndex(v => v.id === e);
  currentIndex.value = index;
};

const setType = (value: string) => {
  cardData.value[currentIndex.value].type = value;
};

// eslint-disable-next-line complexity
const search = (e: string) => {
  const index = cardData.value.findIndex(v => v.id === e);
  const { id, type } = cardData.value[index];
  const value = cardData.value[index].value.trim();
  if (!value) {
    window.$message?.warning('请输入要搜索的内容');
  } else {
    switch (id) {
      case 'surugaya':
        if (type === 'global') {
          window.open(`https://www.suruga-ya.jp/search?search_word=${value}&inStock=On`);
        } else if (type === 'game') {
          window.open(`https://www.suruga-ya.jp/search?category=652&search_word=${value}&inStock=On`);
        } else if (type === 'doujin') {
          window.open(`https://www.suruga-ya.jp/search?category=1101&search_word=${value}&inStock=On`);
        }
        break;
      case 'auctions':
        if (type === 'global') {
          window.open(`https://auctions.yahoo.co.jp/search/search?p=${value}`);
        } else if (type === 'restricted') {
          window.open(`https://auctions.yahoo.co.jp/search/search?auccat=26146&p=${value}`);
        }
        break;
      case 'amazon':
        if (type === 'global') {
          window.open(`https://www.amazon.co.jp/s?k=${value}`);
        } else if (type === 'game') {
          window.open(`https://www.amazon.co.jp/s?k=${value}&i=software`);
        }
        break;
      case 'mandarake':
        if (type === 'global') {
          window.open(`https://order.mandarake.co.jp/order/listPage/list?keyword=${value}`);
        } else if (type === 'game') {
          window.open(`https://order.mandarake.co.jp/order/listPage/list?categoryCode=030114&keyword=${value}`);
        } else if (type === 'doujin') {
          window.open(`https://order.mandarake.co.jp/order/listPage/list?categoryCode=03&keyword=${value}`);
        }
        break;
      case 'hgame1':
        if (type === 'global') {
          window.open(`https://www.hgame1.com/msearch/msearch.cgi?query=${value}`);
        }
        break;
      case 'chuko-tsuhan':
        if (type === 'global') {
          window.open(`http://www.chuko-tsuhan.com/shop/shopbrand.html?search=${EscapeEUCJP(value)}`);
        }
        break;
      case 'lashinbang':
        if (type === 'global') {
          window.open(`https://shop.lashinbang.com/products/list?keyword=${value}&stock=2`);
        } else if (type === 'game') {
          window.open(`https://shop.lashinbang.com/products/list?cat=ゲーム&keyword=${value}&subcat=PCゲーム&stock=2`);
        }
        break;
      case 'mercari':
        if (type === 'global') {
          window.open(`https://jp.mercari.com/search?keyword=${value}`);
        }
        break;
      default:
        break;
    }
  }
};
</script>

<style scoped></style>
