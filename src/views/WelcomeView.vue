<template>
  <div class="welcome">
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
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const changeView = (viewName) => {
  router.push({ name: viewName });
};
</script>

<style scoped lang="scss">
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  width: 100%;
  margin-top: 10%;
  text-align: center;
  &__icon {
    max-width: 325px;
  }
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

