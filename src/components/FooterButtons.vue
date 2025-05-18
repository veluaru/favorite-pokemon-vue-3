<template>
  <div class="footer">
    <button
      class="main-button"
      :class="selectedPokemonView === 'allPokemons' && 'main-button--not-selected'"
      @click="changeSelectedPokemonView('allPokemons')"
      :disabled="selectedPokemonView === 'allPokemons'"
    >
      <img src="../assets/ListIcon.png" alt="List" class="basic-icon" />All
    </button>
    <button
      class="main-button"
      :class="
        selectedPokemonView === 'favoritePokemons' && 'main-button--not-selected'
      "
      @click="changeSelectedPokemonView('favoritePokemons')"
      :disabled="selectedPokemonView === 'favoritePokemons'"
    >
      <img
        src="../assets/WhiteStar.png"
        alt="Star"
        class="basic-icon"
      />Favorites
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import store from "../store";

const selectedPokemonView = computed(() => store.state.selectedPokemonView);

const changeSelectedPokemonView = (view) => {
  store.commit('setSelectedPokemonView', view);
}
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  box-shadow: 0px -5px 4px 0px #0000000d;
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
}
.main-button {
  width: 100%;
  max-width: 275px;
  height: 44px;
  border: none;
  border-radius: 60px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  background-color: #f22539;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  cursor: pointer;
}
.main-button--not-selected {
  background-color: #bfbfbf;
  cursor: initial;
}

.basic-icon {
  width: 22px;
  height: 22px;
}
</style>
