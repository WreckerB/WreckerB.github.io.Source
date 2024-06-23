<template>
  <div>
    <a href="https://baozhen.cc/" target="_blank" class="brantacanadensis">加拿大鹅抱枕研发中心</a>
    <br />
    <br />
    <a href="http://omiai-dakimakura.com/" target="_blank">
      <img alt="おみあい！ 抱き枕カバー" src="/src/assets/png/omiai-dakimakura-logo.png" width="240" height="60" />
    </a>
    <br />
    <n-input-group>
      <n-input v-model:value="omiaiInputValue" style="width: 250px" />
      <n-button type="primary" @click="omiai_search">搜索</n-button>
    </n-input-group>
    <br />
    <br />
    <a href="http://fosblog.blog94.fc2.com/" target="_blank">
      <div class="fosblog">×Phos/抱き枕×</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const omiaiInputValue = ref('');

function omiai_search() {
  const urlText = `http://omiai-dakimakura.com/?s=${omiaiInputValue.value}`;
  if (omiaiInputValue.value.trim() !== '') {
    omiaiInputValue.value = '';
    window.open(urlText);
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.brantacanadensis {
  font-size: 1.75em;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.4285em;
  background: #454e5c;
  color: #fff;
}
.fosblog {
  font-family: 'Arial Black', 'Impact', 'ＭＳ Ｐゴシック', 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', 'Osaka',
    serif;
  font-size: 30px;
  color: #3a3128;
}
</style>
