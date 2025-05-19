<template>
  <div class="search-bar">
    <div class="search-bar__wrapper">
      <i class="pi pi-search search-bar__icon"></i>
      <input
        v-model="searchWord"
        type="text"
        class="search-bar__input"
        placeholder="Search"
        @keydown.enter="searchPokemonWord"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useStore();
const searchWord = ref("");
const isSearchView = computed(() => store.state.isSearchView);
const allPokemons = computed(() => store.state.allPokemons);

const changeView = (viewName, params) => {
  router.push({ name: viewName, params: { ...params } });
};

const searchPokemonWord = async () => {
  store.commit("setSearchPokemonWord", searchWord.value);
  if (searchWord.value) {
    if (allPokemons.value.length === 0) await store.dispatch("getAllPokemons");
    changeView("search", { word: searchWord.value });
  }
  if (!searchWord.value && isSearchView.value) {
    changeView("pokemons");
  }
};
</script>

<style scoped lang="scss">
.search-bar {
  max-width: 570px;
  width: 100%;
  margin: 30px 0;
  &__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 4px #00000012;
    max-width: 540px;
    height: 50px;
    padding: 0 3%;
  }
  &__input {
    border: none;
    font-size: 16px;
    font-weight: medium;
    color: #353535;
    width: 100%;
    max-width: 540px;
    height: 45px;
    &::placeholder {
      color: #bfbfbf;
      font-size: 16px;
      font-weight: medium;
    }
    &:focus-visible {
      outline: none;
      outline-offset: unset;
    }
  }
  &__icon {
    color: #bfbfbf;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
