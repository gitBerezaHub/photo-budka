<script setup lang="ts"></script>

<template>
  <div class="photo-item">
    <img
      src="../assets/skeleton-photo.svg"
      alt="Фото"
      class="photo-thumbnail" />
  </div>
</template>

<style scoped>
.photo-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #2a2a2a;
}

.photo-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
