<template>
  <div class="welcome" v-if="!loadingNextPage">
    <img
      src="../assets/images/Pikachu.png"
      alt="Welcome Pikachu"
      class="welcome__icon"
    />
    <span class="welcome__title">Welcome to Pokédex</span>
    <span class="welcome__sub-title">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </span>
    <button class="welcome__main-button" @click="changeView('pokemons')">
      Get started
    </button>
  </div>
  <LoadingComponent class="welcome__loading" v-if="loadingNextPage" />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingComponent from "../components/LoadingComponent.vue";

const router = useRouter();
const loadingNextPage = ref(false);

const changeView = (viewName) => {
  loadingNextPage.value = true;
  setTimeout(() => {
    loadingNextPage.value = true;
    router.push({ name: viewName });
  }, 2000);
};
</script>

<style scoped lang="scss">
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  padding: 10% 3% 0 3%;
  text-align: center;
  &__icon {
    max-width: 325px;
    @media screen and (max-width: 328px) {
      max-width: 150px;
    }
  }
  &__title {
    font-size: 26px;
    font-weight: bold;
  }
  &__main-button {
    @include main-button;
  }
  &__sub-title {
    font-size: 18px;
    font-weight: medium;
    max-width: 570px;
  }
  &__loading {
    max-width: unset;
    width: 100%;
    padding-top: 30%;
  }
}
</style>

