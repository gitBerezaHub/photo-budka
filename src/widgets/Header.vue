<script setup lang="ts"></script>

<template>
  <section class="header">
    <div class="back" @click="$emit('prevPage')">
      <img class="back-arrow" src="../assets/back-arrow.svg" alt="" />
      <span class="back-text">Back</span>
    </div>
    <div class="title">
      <h1 class="upload">Загрузка фото</h1>
      <p class="name">Фотобудка</p>
    </div>
  </section>
</template>

<style scoped>
.header {
  color: #fff;
  margin-top: 10px;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 36px;
}

.back {
  display: flex;
  flex-direction: row;
  width: calc(75px - 2 * 8px);
  height: calc(44px - 2 * 11px);
  gap: 3px;
  padding: 11px 8px;
}

.back-arrow {
  height: 22px;
  width: 17px;
}

.back-text {
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: #007aff;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.upload {
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
}

.name {
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.1px;
  text-align: center;
  color: #aaaaaa;
}
</style>
