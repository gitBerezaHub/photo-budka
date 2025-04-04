<script lang="ts" setup>
import {onMounted} from "vue";
import {initTelegramApp, isTelegramWebApp} from "./api/telegram-utils.ts";

onMounted(() => {
  if (isTelegramWebApp()) {
    initTelegramApp();
  }
});
</script>

<template>
  <RouterView />
</template>

<style></style>
