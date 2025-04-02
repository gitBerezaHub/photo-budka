<script setup lang="ts">
import Header from '../widgets/Header.vue'
import AndroidButton from "../components/AndroidButton.vue";
</script>

<template>
  <Header/>
  <section class="wrapper">
    <div class="img-wrapper">
      <img class="photo" src="../assets/upload-photo1.png" alt="Example Photo">
    </div>
    <div class="text-wrapper">
    <span class="text">
    Нейросеть должна знать как вы выглядите в профиль или в полупрофиль. Она должна увидеть как вы выглядите в разных локациях, при разном освещении. Как ведут себя ваши волосы, какие прически вы предпочитаете. Как вы выглядете с разным макияжем и вовсе без него. Какие оттенки  и текстура у вашей кожи и как вы получаетесь на черно-белых фото.
    </span>
    </div>
    <AndroidButton />
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

.img-wrapper {
  width: 100%;
  height: 474px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-wrapper {
  margin-top: 40px;
  width: 100%;
  text-align: left;
  height: 140px;
  display: flex;
  align-items: flex-end;
}

.text {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.43px;
}
</style>
