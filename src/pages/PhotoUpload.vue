<script setup lang="ts">
import Header from "../widgets/Header.vue";
import AndroidButton from "../components/AndroidButton.vue";
import {reactive} from "vue";

interface IButton {
  text?: string
  background?: string
  color?: string
  isDisabled?: boolean,
  margin?: number
}

const submitButton: IButton = reactive({
  text: 'Все понятно!',
  background: '#32E55E',
  color: '#000000',
  margin: 90
})

const addPhotoButton: IButton = reactive({
  text: 'Добавить фото',
  background: '#222222',
  color: '#FFFFFF66',
  isDisabled: true,
})

const submit = () => {
  submitButton.background = '#222222'
  submitButton.color = '#32E55E'
  submitButton.isDisabled = true

  addPhotoButton.background = '#2990FF'
  addPhotoButton.color = '#fff'
  addPhotoButton.isDisabled = false
}

</script>

<template>
  <Header/>
  <section class="wrapper">
    <div class="title-wrapper">
      <h2 class="title">Загрузите от 15 до 40 фото.</h2>
      <h3 class="sub-title">Чем больше, тем лучше сможет обучиться нейросеть.</h3>
    </div>
    <div class="emoji-wrapper">
      <img class="emoji" src="../assets/emoji.png" alt="">
    </div>
    <div class="text-wrapper">
      <span class="text">Не торопитесь. Можно сделать отдельный альбом, в медиатеке смартфона или облачном хранилище, куда вы аккуратно соберете ваши фотографии, а затем вернетесь сюда и добавите.
Это единственная ваша задача перед тем как все станет очень просто и увлекательно!</span>
    </div>
    <AndroidButton v-bind="submitButton" @click="submit"/>
    <AndroidButton v-bind="addPhotoButton" />
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

.title-wrapper {
  height: 48px;
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-weight: 700;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  text-align: center;
  vertical-align: middle;
}

.sub-title {
  font-weight: 510;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.43px;
  text-align: center;
  vertical-align: middle;
}

.emoji-wrapper {
  width: inherit;
  height: 432px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.43px;
  vertical-align: middle;
}
</style>
