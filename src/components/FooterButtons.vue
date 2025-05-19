<template>
  <div class="footer">
    <button
      class="footer__main-button"
      :class="selectedPokemonView === 'allPokemons' && 'footer__main-button--selected'"
      @click="changeSelectedPokemonView('allPokemons')"
      :disabled="selectedPokemonView === 'allPokemons'"
    >
      <i class="pi pi-list basic-icon"></i>All
    </button>
    <button
      class="footer__main-button"
      :class="
        selectedPokemonView === 'favoritePokemons' && 'footer__main-button--selected'
      "
      @click="changeSelectedPokemonView('favoritePokemons')"
      :disabled="selectedPokemonView === 'favoritePokemons'"
    >
      <i class="pi pi-star-fill basic-icon"></i>Favorites
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import store from "../store";

const selectedPokemonView = computed(() => store.state.selectedPokemonView);

const changeSelectedPokemonView = (view) => {
  store.commit("setSelectedPokemonView", view);
};
</script>

<style scoped lang="scss">
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
    @media screen and (max-width: 328px) {
      flex-direction: column;
      row-gap: 20px;
    }
  &__main-button {
    @include main-button;
    width: 100%;
    max-width: 275px;
    background-color: #bfbfbf;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    cursor: pointer;
    &--selected {
      background-color: #f22539;
      cursor: initial;
    }
  }
}

.basic-icon {
  color: white;
  font-size: 22px;
}
</style>
