<template>
  <div class="photo-skeleton-container">
    <div class="photo-skeleton-grid">
      <div v-for="n in 15" :key="n" class="photo-skeleton-item">
        <div class="photo-skeleton-icon"></div>
      </div>
    </div>

    <div class="loading-overlay">
      <HalfCircleSpinner
          :animation-duration="1000"
          :size="60"
          color="#9e9e9e"
      />
      <div class="loading-text">Loading</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HalfCircleSpinner } from 'epic-spinners'
</script>

<style scoped>
.photo-skeleton-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
  width: 100%;
  box-sizing: border-box;
}

.photo-skeleton-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
}

.photo-skeleton-icon {
  width: 100%;
  height: 100%;
  background-image: url("../assets/skeleton-photo.svg");
}

.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #353239;
  padding: 20px 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 3;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 16px;
  color: white;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
