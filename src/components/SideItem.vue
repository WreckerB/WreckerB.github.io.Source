<template>
  <n-back-top :bottom="140" :right="20" class="w-50px h-50px rounded-full" />
  <n-float-button @click="toggleTheme" bottom="80" height="50" right="20" width="50">
    <n-icon size="40">
      <DarkModeOutlined v-if="isDark" />
      <DarkModeFilled v-else />
    </n-icon>
  </n-float-button>
  <n-float-button @click="toGithub" bottom="20" height="50" right="20" width="50">
    <n-icon size="40">
      <Github />
    </n-icon>
  </n-float-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DarkModeFilled, DarkModeOutlined } from '@vicons/material'
import { Github } from '@vicons/fa'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const toGithub = () => {
  window.open('https://github.com/WreckerB')
}

// 页面加载时检查本地存储的主题设置
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<style scoped></style>
