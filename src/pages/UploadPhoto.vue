<script setup lang="ts">
import Header from '../widgets/Header.vue'
</script>

<template>
  <section class="wrapper">
    <Header />
    <div class="img-wrapper">
    <img class="photo" src="../assets/upload-photo1.png" alt="Example Photo">
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: calc(100vh - 10px);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-wrapper {
  width: calc(100% - 2*18px);
  height: 474px;
  margin-top: 24px;
}
</style>
