<script lang="ts" setup>
defineEmits(['prevPage'])
</script>

<template>
  <section class="header">
    <div class="back" @click="$emit('prevPage')">
      <img alt="" class="back-arrow" src="../assets/back-arrow.svg" />
      <span class="back-text">Back</span>
    </div>
    <div class="title">
      <h1 class="upload">Загрузка фото</h1>
      <p class="name">Фотобудка</p>
    </div>
  </section>
  <div class="header-spacer"></div>
</template>

<style scoped>
.header {
  color: #fff;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 36px;
  z-index: 1000; /* Увеличиваем z-index, чтобы хедер был поверх других элементов */

  /* Добавляем фиксированное позиционирование */
  position: fixed;
  top: 0;
  left: 0;

  /* Добавляем фон и тень для визуального отделения */
  background-color: #121212; /* Цвет фона, соответствующий темной теме */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Элемент для компенсации высоты фиксированного хедера */
.header-spacer {
  height: 56px; /* Высота хедера + отступы */
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
  margin: 0; /* Убираем стандартные отступы для h1 */
}

.name {
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.1px;
  text-align: center;
  color: #aaaaaa;
  margin: 0; /* Убираем стандартные отступы для p */
}
</style>
