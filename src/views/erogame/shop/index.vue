<template>
  <div>
    <a href="https://www.suruga-ya.jp/" target="_blank">
      <img alt="駿河屋" src="/src/assets/svg-icon/surugaya-logo.svg" width="170" height="52" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="surugayaInputValue" style="width: 250px" />
      <n-button type="primary" @click="surugaya_search">搜索</n-button>
    </n-input-group>
    <br />
    <br />
    <a href="https://order.mandarake.co.jp/order/" target="_blank">
      <img alt="MANDARAKE" src="/src/assets/png-icon/mandarake.co.jp-logo.png" width="256" height="56" />
    </a>
    <br />
    <br />
    <a href="https://shop.lashinbang.com/" target="_blank">
      <img alt="らしんばん" src="/src/assets/png-icon/lashinbang-logo.png" width="240" height="70" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="lashinbangInputValue" style="width: 250px" />
      <n-button type="primary" @click="lashinbang_search">搜索</n-button>
    </n-input-group>
    <br />
    <br />
    <a href="http://www.chuko-tsuhan.com/" target="_blank">
      <img alt="秋葉原トレーダー" src="/src/assets/gif-icon/chuko-tsuhan-logo.gif" width="232" height="62" />
    </a>
    <br />
    <br />
    <a href="https://jp.mercari.com/" target="_blank">
      <img alt="Mercari" src="/src/assets/svg-icon/mercari-logo.svg" width="208" height="56" />
    </a>
    <br />
    <br />
    <a href="https://www.amazon.co.jp/" target="_blank">
      <img alt="Amazon.co.jp" src="/src/assets/svg-icon/amazon.co.jp-logo.svg" width="240" height="56" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="amazonInputValue" style="width: 250px" />
      <n-button type="primary" @click="amazon_search">搜索</n-button>
    </n-input-group>
    <br />
    <br />
    <a href="https://auctions.yahoo.co.jp/" target="_blank">
      <img alt="ヤフオク!" src="/src/assets/png-icon/auctions.yahoo.co.jp-logo.png" width="201" height="45" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="auctionsInputValue" style="width: 250px" />
      <n-button type="primary" @click="auctions_search">搜索</n-button>
    </n-input-group>
    <br />
    <br />
    <a href="https://www.arzon.jp/" target="_blank">
      <img alt="アダルトは安心のアルゾン！" src="/src/assets/gif-icon/arzon-logo.gif" width="200" height="50" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="arzonInputValue" style="width: 250px" />
      <n-button type="primary" @click="arzon_search">搜索</n-button>
    </n-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const surugayaInputValue = ref('');
const lashinbangInputValue = ref('');
const amazonInputValue = ref('');
const auctionsInputValue = ref('');
const arzonInputValue = ref('');

function surugaya_search() {
  const urlText = `https://www.suruga-ya.jp/search?category=65204&search_word=${surugayaInputValue.value}&inStock=On`;
  if (surugayaInputValue.value.trim() !== '') {
    surugayaInputValue.value = '';
    window.open(urlText);
  }
}
function lashinbang_search() {
  const urlText = `https://shop.lashinbang.com/products/list?cat=%E3%82%B2%E3%83%BC%E3%83%A0&keyword=${lashinbangInputValue.value}&subcat=PCゲーム&stock=2`;
  if (lashinbangInputValue.value.trim() !== '') {
    lashinbangInputValue.value = '';
    window.open(urlText);
  }
}
function amazon_search() {
  const urlText = `https://www.amazon.co.jp/s?k=${amazonInputValue.value}&i=software`;
  if (amazonInputValue.value.trim() !== '') {
    amazonInputValue.value = '';
    window.open(urlText);
  }
}
function auctions_search() {
  const urlText = `https://auctions.yahoo.co.jp/search/search?&p=${auctionsInputValue.value}`;
  if (auctionsInputValue.value.trim() !== '') {
    auctionsInputValue.value = '';
    window.open(urlText);
  }
}
function arzon_search() {
  const urlText = `https://www.arzon.jp/animelist.html?q=${arzonInputValue.value}`;
  if (arzonInputValue.value.trim() !== '') {
    arzonInputValue.value = '';
    window.open(urlText);
  }
}
</script>

<style scoped></style>
