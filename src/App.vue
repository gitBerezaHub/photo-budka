<script lang="ts" setup>
import {onMounted} from "vue";
onMounted(() => {
  const isTelegram = window.Telegram && window.Telegram.WebApp;

  if (isTelegram) {
    const urlParams = new URLSearchParams(window.location.search);
    const isExpanded = urlParams.get('tgWebAppExpand') === '1';

    if (!isExpanded) {
      const currentUrl = window.location.href;
      const separator = currentUrl.includes('?') ? '&' : '?';
      const newUrl = `${currentUrl}${separator}tgWebAppExpand=1`;

      window.location.href = newUrl;
    }

      window.Telegram?.WebApp?.ready();
  }
});
</script>

<template>
  <RouterView />
</template>

<style></style>
