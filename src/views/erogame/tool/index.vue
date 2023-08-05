<template>
  <div>
    <a href="https://buyee.jp/" target="_blank">
      <img alt="Buyee" src="/src/assets/png-icon/buyee-logo.png" width="125" height="36" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="buyeeInputValue" style="width: 250px" />
      <n-button type="primary" @click="buyee_search">搜索</n-button>
    </n-input-group>
    <br />
    <br />
    <a href="https://erocate.com" target="_blank">
      <img alt="erocate.com" src="/src/assets/png-icon/erocate-logo.png" width="176" height="21" />
    </a>
    <br />
    <br />
    <div class="keepa">
      <a href="https://keepa.com/#!" target="_blank">
        <img alt="keepa" src="/src/assets/svg-icon/keepa-logo.svg" width="195" height="56" />
      </a>
    </div>
    <n-input-group>
      <n-input v-model:value="keepaInputValue" style="width: 250px" />
      <n-button type="primary" @click="keepa_search">搜索</n-button>
    </n-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const buyeeInputValue = ref('');
const keepaInputValue = ref('');

function buyee_search() {
  const urlText = `https://buyee.jp/item/search/query/${buyeeInputValue.value}/category/2084006448?lang=ja`;
  if (buyeeInputValue.value.trim() !== '') {
    buyeeInputValue.value = '';
    window.open(urlText);
  }
}

function keepa_search() {
  const urlText = `https://keepa.com/#!product/5-${keepaInputValue.value}`;
  if (keepaInputValue.value.trim() !== '') {
    keepaInputValue.value = '';
    window.open(urlText);
  }
}
</script>

<style scoped>
.keepa {
  width: 195px;
  background: #454545;
}
</style>
