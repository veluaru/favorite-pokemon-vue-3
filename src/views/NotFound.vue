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
  min-height: 100vh;
  padding: 0 20px;
  text-align: center;
  background-color: var(--app-background-color);
  background-image: var(--app-background-image);
  background-repeat: repeat;
  background-position: center center;
  background-size: var(--app-background-size);

  &__title {
    font-size: 26px;
    font-weight: bold;
    color: var(--app-text-color);
  }
  &__main-button {
    @include main-button;
  }
  &__sub-title {
    font-size: 18px;
    font-weight: medium;
    max-width: 570px;
    color: var(--app-text-secondary-color);
  }
}
</style>
