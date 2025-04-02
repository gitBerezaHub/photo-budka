<script setup lang="ts">
import Header from '../widgets/Header.vue'
import AndroidButton from '../components/AndroidButton.vue'
import { ref } from 'vue'
import router from "../router";

const pageNumber = ref(1)

const nextPage = () => pageNumber.value >= 3 ? router.push('/upload') : pageNumber.value++

const prevPage = () => pageNumber.value > 1 && pageNumber.value--
</script>

<template>
  <Header @prev-page="prevPage" />
  <section class="wrapper">
    <img
      class="photo"
      :src="`images/recommendations${pageNumber}.png`"
      alt="Example Photo" />
    <div class="text-wrapper">
      <span class="text" v-if="pageNumber === 1"
        >Нейросеть должна знать как вы выглядите в профиль или в полупрофиль.
        Она должна увидеть как вы выглядите в разных локациях, при разном
        освещении. Как ведут себя ваши волосы, какие прически вы предпочитаете.
        Как вы выглядете с разным макияжем и вовсе без него. Какие оттенки и
        текстура у вашей кожи и как вы получаетесь на черно-белых фото.</span
      >
      <div class="text" v-else-if="pageNumber === 2">
        <p>
          <span>Рекомендуем НЕ</span> использовать фотографии, которые были
          скачаны из социальных сетей – они сильно сжаты.
        </p>
        <p>
          <span>Рекомендуем</span> НЕ использовать фотографии низкого
          разрешения. Из-за этих двух условий ваш аватар может получиться
          некачественным.
        </p>
      </div>
      <div class="text" v-else>
        <p>Нельзя использовать фото где:</p>
        <ul>
          <li>несколько людей в кадре</li>
          <li>неудачный ракурс</li>
          <li>маленькие лица в кадре</li>
          <li>плохая композиция и освещение</li>
        </ul>
        <p>
          Качество ваших фотографий напрямую зависит от того, на каких
          фотографиях вы будете непосредственно
        </p>
      </div>
    </div>
    <AndroidButton @click="nextPage" />
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

.photo {
  margin-top: 24px;
  width: 394px;
  height: 474px;
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

.text p {
  margin: 0 0 10px 0;
}

.text span {
  color: #fff45c;
}

.text ul {
  padding-left: 20px;
  margin: 0 0 10px 0;
  list-style-type: disc;
}
</style>
