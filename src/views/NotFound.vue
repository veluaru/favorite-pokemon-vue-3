<template>
  <div class="not-found">
    <span class="not-found__title">Uh-oh!</span>
    <span class="not-found__sub-title">You look lost on your journey!</span>
    <button class="not-found__main-button" @click="changeView('pokemons')">
      Go back home
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const changeView = (viewName) => {
  router.push({ name: viewName });
};
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  width: 100%;
  margin-top: 10%;
  text-align: center;
  &__title {
    font-size: 26px;
    font-weight: bold;
  }
  &__main-button {
    width: 150px;
    height: 44px;
    border: none;
    border-radius: 60px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    background-color: #f22539;
    cursor: pointer;
  }
  &__sub-title {
    font-size: 18px;
    font-weight: medium;
    max-width: 570px;
  }
}
</style>
