<template>
  <div class="search-bar">
    <input
      :value="searchWord"
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

const store = useStore();
const searchWord = ref("");
const allPokemons = computed(() => store.state.allPokemons);
const isAllPokemonsFiltered = ref(false);

const searchPokemonWord = async () => {
  if (searchWord.value) {
    console.log("1")
    if (allPokemons.value.length === 0) await store.dispatch("getAllPokemons");
    const newArray = allPokemons.value.filter((pokemon) =>
      pokemon.name.includes(searchWord.value)
    );
    store.commit("setAllPokemons", newArray);
    return;
  }
  if(!searchWord.value && isAllPokemonsFiltered.value) {
    console.log("2")
    await store.dispatch("getAllPokemons");
    return;
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
