<script setup lang="ts">
import Header from "../widgets/Header.vue";
</script>

<template>
  <Header/>
  <section class="wrapper">
    <h1>hi</h1>
  </section>
</template>

<style scoped>
.wrapper {
  width: calc(100vw - 2 * 18px);
  height: calc(100vh - 64px);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
</style>
