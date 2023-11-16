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
                  class="w-72px"
                  :default-value="item.options[0].label"
                  :options="item.options"
                  @click="setIndex(item.id)"
                  @update:value="setType"
                />
                <n-input v-model:value="item.value" :style="{ width: 'calc(100% - 132px)' }" clearable />
                <n-button class="w-60px" type="primary" ghost @click="search(item.id)">搜索</n-button>
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
    cover: '/src/assets/svg-icon/surugaya-logo.svg',
    title: '駿河屋',
    icon: '/src/assets/png/surugaya-icon.png',
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
    cover: '/src/assets/png/auctions-logo.png',
    title: 'ヤフオク',
    icon: '/src/assets/ico/auctions-icon.ico',
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
    cover: '/src/assets/svg-icon/amazon-logo.svg',
    title: 'Amazon',
    icon: '/src/assets/ico/amazon-icon.ico',
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
    cover: '/src/assets/png/mandarake-logo.png',
    title: 'まんだらけ',
    icon: '/src/assets/ico/mandarake-icon.ico',
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
    id: 'lashinbang',
    cover: '/src/assets/png/lashinbang-logo.png',
    title: 'らしんばん',
    icon: '/src/assets/ico/lashinbang-icon.ico',
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
    id: 'chuko-tsuhan',
    cover: '/src/assets/gif/chuko-tsuhan-logo.gif',
    title: '秋葉原トレーダー',
    icon: '/src/assets/ico/chuko-tsuhan-icon.ico',
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
    id: 'hgame1',
    cover: '/src/assets/gif/hgame1-logo.gif',
    title: 'PCショップうの屋',
    icon: '/src/assets/ico/hgame1-icon.ico',
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
    id: 'mercari',
    cover: '/src/assets/svg-icon/mercari-logo.svg',
    title: 'メルカリ',
    icon: '/src/assets/ico/mercari-icon.ico',
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
    case 'lashinbang':
      window.open('https://shop.lashinbang.com');
      break;
    case 'chuko-tsuhan':
      window.open('http://www.chuko-tsuhan.com');
      break;
    case 'hgame1':
      window.open('https://www.hgame1.com/top.html');
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
      case 'lashinbang':
        if (type === 'global') {
          window.open(`https://shop.lashinbang.com/products/list?keyword=${value}&stock=2`);
        } else if (type === 'game') {
          window.open(`https://shop.lashinbang.com/products/list?cat=ゲーム&keyword=${value}&subcat=PCゲーム&stock=2`);
        }
        break;
      case 'chuko-tsuhan':
        if (type === 'global') {
          window.open(`http://www.chuko-tsuhan.com/shop/shopbrand.html?search=${EscapeEUCJP(value)}`);
        }
        break;
      case 'hgame1':
        if (type === 'global') {
          window.open(`https://www.hgame1.com/msearch/msearch.cgi?query=${EscapeEUCJP(value)}`);
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
