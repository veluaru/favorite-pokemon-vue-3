<template>
  <div class="search-bar">
    <input
      v-model="searchWord"
      type="text"
      class="search-bar__input"
      placeholder="Search"
      @keydown.enter="searchPokemonWord"
    />
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
  router.push({ name: viewName, params: {...params} });
};

const searchPokemonWord = async () => {
  store.commit('setSearchPokemonWord', searchWord.value);
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
  margin: 20px 0;
  &__input {
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 4px #00000012;
    width: 100%;
    max-width: 540px;
    height: 50px;
    padding: 0 3%;
    &::placeholder {
      color: #bfbfbf;
      font-size: 12px;
      font-weight: medium;
    }
    &:focus-visible {
      outline: none;
      outline-offset: unset;
    }
  }
}
</style>
